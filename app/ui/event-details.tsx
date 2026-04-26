import { getEventAttendees, getEventDetails } from "../lib/actions"

export default async function EventDetails({ eventId }: { eventId: string }) {

    const event = await getEventDetails(eventId);
    const attendees = await getEventAttendees(eventId);

    console.log('Event:', event);
    console.log('Attendees:', attendees);
    return (
        <div>
            <h1>Event Details for Event ID: {eventId}</h1>
        </div>
    )
}