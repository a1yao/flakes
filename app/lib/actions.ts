'use server';
 
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import z, { string } from 'zod';
import postgres from 'postgres';
import { time } from 'console';
import { redirect } from 'next/dist/server/api-utils';
import { Event, EventLite, UserLite } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
// TODO: User created date?
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})
const validateUserSchema = userSchema.omit({ id: true });


// TODO: Check deprecated functions
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


export async function getEventDetails(eventId: string): Promise<Event> {
  try {
    const event = await sql<Event[]>`
    SELECT * FROM events WHERE id = ${eventId}
    `;
    if (!event[0]) {
      throw new Error('Event not found');
    }

    return event[0];
  }
  catch (error) {
    console.error('Failed to fetch event:', error);
    throw new Error('Failed to fetch event.');
  }
}

// TODO: Create a filter class? Need to filter based on date later. 
export async function getEventList(userId: string): Promise<EventLite[]> {
  try {
    const events = await sql<EventLite[]>`
    SELECT events.id, events.name, events.date, events.time
    FROM events
    JOIN "eventAttendees" ON events.id = "eventAttendees".event_id
    WHERE "eventAttendees".user_id = ${userId}
    `;

    return events;
  }
  catch (error) {
    console.error('Failed to fetch events:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function getEventAttendees(eventId: string): Promise<UserLite[]> {
  try {
    const attendees = await sql<UserLite[]>`
    SELECT users.id, users.name 
    FROM users
    JOIN "eventAttendees" ON users.id = "eventAttendees".user_id
    WHERE "eventAttendees".event_id = ${eventId}
    `;

    return attendees;
  }
  catch (error) {
    console.error('Failed to fetch event attendees:', error);
    throw new Error('Failed to fetch event attendees.');
  }
}

export async function joinEvent(eventId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    await sql`
      INSERT INTO "eventAttendees" (event_id, user_id, flaked)
      VALUES (${eventId}, ${userId}, false)
    `;
  }
  catch (error) {
    console.error('Failed to join event:', error);
    throw new Error('Failed to join event.');
  }
}

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
    throw new Error('Unauthorized');
  }


  const [{ id: eventId }] = await sql`
    INSERT INTO events (name, description, date, time, created_by)
    VALUES (${name}, ${description}, ${date}, ${time}, ${userId})
    RETURNING id
  `;

  console.log
  if (!eventId) {
    throw new Error('Failed to create event');
  }

  await sql`
    INSERT INTO "eventAttendees" (event_id, user_id, flaked)
    VALUES (${eventId}, ${userId}, false)
    `;
  

  return eventId;
}

export async function leaveEvent(eventId: string) {
  const session = await auth();
  const userId = session?.user?.id; 

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    await sql`
      DELETE FROM "eventAttendees"
      WHERE event_id = ${eventId} AND user_id = ${userId}
    `;
  }
  catch (error) {
    console.error('Failed to leave event:', error);
    throw new Error('Failed to leave event.');
  }
}

export async function signup(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    callbackUrl: formData.get('callbackUrl'),
  }
  console.log('Raw form data:', rawFormData);
  
  // TODO: Password strength validation checks
  const redirectTo = rawFormData.callbackUrl?.toString() || '/dashboard';
  console.log('Callback URL:', redirectTo);

  const { email, name, password } = validateUserSchema.parse(rawFormData);
  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (email, name, password)
    VALUES (${email}, ${name}, ${hashedPassword})
  `;

  await signIn('credentials', { email, password, redirectTo });

}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("Raw form data:", Object.fromEntries(formData.entries()));
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