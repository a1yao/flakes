'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
// TODO: User created date?
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})
const validateUserSchema = userSchema.omit({ id: true });

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