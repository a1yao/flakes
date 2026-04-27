import { auth } from "@/auth";
import { getEventAttendees, getEventDetails, joinEvent, leaveEvent } from "../lib/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import HomeButton from "./home-button";

// TODO: Separate AttendeesList component?
export default async function EventDetails({ eventId }: { eventId: string }) {
  const event = await getEventDetails(eventId);
  const attendees = await getEventAttendees(eventId);
  const session = await auth();
  const user = session?.user;

  const isUserAttending = !!user && attendees.some((attendee) => attendee.id === user.id);

  async function flakeEventAction(formData: FormData) {
    "use server";
  }
  async function leaveEventAction(formData: FormData) {
    "use server";
    // This shouldn't ever be the case because the leave button should only ever appear if the user is signed in. But just in case, we check again and redirect to login if not signed in.
    if (!user) {
        redirect(`/login?callbackUrl=${encodeURIComponent(`/event/${eventId}`)}`);
    }
    else {
        await leaveEvent(eventId);
        revalidatePath(`/event/${eventId}`);
    }
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
    <div className="relative min-h-screen bg-slate-800 px-4 py-10 sm:px-6 lg:px-8 text-slate-100">
      <HomeButton />
      <div className="max-w-5xl mx-auto rounded-[2rem] bg-slate-900/90 p-8 shadow-2xl shadow-slate-900/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-100">{event.name}</h1>
            <p className="mt-3 max-w-2xl text-slate-300 leading-7">{event.description}</p>
          </div>
          <div className="rounded-3xl bg-slate-800 p-5 text-slate-200 shadow-inner shadow-slate-900/20">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">When</p>
            <p className="mt-3 text-lg font-medium text-slate-100">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm text-slate-300 mt-1">{event.time}</p>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] bg-slate-800 p-8 shadow-inner shadow-slate-900/30">
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Attendees</h2>
          {attendees.length === 0 ? (
            <p className="text-slate-400">No attendees yet.</p>
          ) : (
            <ul className="space-y-3">
              {attendees.map((attendee) => (
                <li key={attendee.id} className="rounded-3xl bg-slate-700 p-4 text-slate-100 shadow-sm shadow-slate-900/20">
                  {attendee.name}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            {isUserAttending ? (
              <form action={leaveEventAction}>
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-white hover:bg-sky-500 transition-colors"
                >
                  Leave Event
                </button>
              </form>
            ) : (
              <form action={joinEventAction}>
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-teal-600 px-4 py-3 text-white hover:bg-teal-500 transition-colors"
                >
                  Join Event
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
