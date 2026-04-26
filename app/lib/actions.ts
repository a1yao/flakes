'use server';
 
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import z from 'zod';
import postgres from 'postgres';
import { time } from 'console';
import { redirect } from 'next/dist/server/api-utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
// TODO: User created date?
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})
const validateUserSchema = userSchema.omit({ id: true });

const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  date: z.string().date(),
  time: z.string().time(),
  created_date: z.string(),
  created_by: z.string(),
})
const validateEventSchema = eventSchema.omit({id: true, created_date: true, created_by: true});

export async function createEvent(prevState: string | undefined, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description'),
    date: formData.get('date'),
    time: formData.get('time'),
  }

  const { name, description, date, time } = validateEventSchema.parse(rawFormData);
  const session = await auth();
  const userId = session?.user?.id;


  if (!userId) {
    throw new Error('User ID not found');
  }


  const eventId = await sql`
    INSERT INTO events (name, description, date, time, created_by)
    VALUES (${name}, ${description}, ${date}, ${time}, ${userId})
    RETURNING id
  `;
  
  console.log(eventId);
  return eventId;



}

export async function signup(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
  }
  
  // TODO: Password strength validation checks
  const { email, name, password } = validateUserSchema.parse(rawFormData);
  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (email, name, password)
    VALUES (${email}, ${name}, ${hashedPassword})
  `;

  await signIn('credentials', { email, password });

}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    formData.append('callbackUrl', '/dashboard');
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}