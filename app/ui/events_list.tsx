import Link from "next/link";
import { getEventList } from "../lib/actions";
import { EventLite } from "../lib/definitions";

export default async function EventsList({ userId }: { userId: string }) {
  const events = await getEventList(userId);

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const time = new Date(`1970-01-01T${timeStr}`);
    return `${date.toLocaleDateString()} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="bg-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-8 text-center">
          Your Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: EventLite) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <div className="bg-slate-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <h2 className="text-xl font-semibold text-slate-100 mb-2">{event.name}</h2>
                <p className="text-slate-300">
                  {formatDateTime(event.date.toString(), event.time)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}