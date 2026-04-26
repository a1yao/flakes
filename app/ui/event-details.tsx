import { auth } from "@/auth";
import { getEventAttendees, getEventDetails, joinEvent } from "../lib/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EventDetails({ eventId }: { eventId: string }) {
  const event = await getEventDetails(eventId);
  const attendees = await getEventAttendees(eventId);
  const session = await auth();
  const user = session?.user;

  const isUserAttending = !!user && attendees.some((attendee) => attendee.id === user.id);

  async function flakeEventAction(formData: FormData) {
    "use server";
  }
  async function joinEventAction(formData: FormData) {
    "use server";

    if (!user) {
        redirect(`/login?callbackUrl=${encodeURIComponent(`/event/${eventId}`)}`);
    }
    else {
        await joinEvent(eventId);
        revalidatePath(`/event/${eventId}`);
    }
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>
        {event.date.toString()} at {event.time}
      </p>

      <section>
        <h2>Attendees</h2>
        <ul>
          {attendees.map((attendee) => (
            <li key={attendee.id}>{attendee.name}</li>
          ))}
        </ul>
      </section>

      {isUserAttending ? (
        <form action={flakeEventAction}>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Flake
          </button>
        </form>
      ) : (
        <form action={joinEventAction}>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Join event
          </button>
        </form>
      )}
    </div>
  );
}
