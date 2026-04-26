import EventDetails from "@/app/ui/event-details";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: eventId } = await params;
    return (
        <div>
            <EventDetails eventId={eventId}/>
        </div>
    )
}