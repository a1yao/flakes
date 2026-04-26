import Link from "next/link";
import { getEventList } from "../lib/actions"
import { EventLite } from "../lib/definitions";

export default async function EventsList({ userId }: { userId: string }) {
  const events = await getEventList(userId);

  return (
    <div>
      <h1>Events List</h1>
      <ul>
        {events.map((event: EventLite) => (
          <li key={event.id}>
            <Link href={`/event/${event.id}`}>
              <div>
                <h2>{event.name}</h2>
                <p>{event.date.toString()} at {event.time}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}