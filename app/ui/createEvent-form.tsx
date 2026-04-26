'use client';

import { redirect } from "next/navigation";
import { createEvent } from "../lib/actions";
import { useActionState } from "react";

export default function CreateEventForm() {
    const handleSubmit = async (formData: FormData) => {
        const eventId = await createEvent(undefined, formData);
        redirect(`/events/${eventId}`);
    }
    return (
        <form action={handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="name" className="bg-gray-50 w-100 text-gray-900" placeholder="Event Name"/>
            <textarea name="description" className="bg-gray-50 w-100 text-gray-900" placeholder="Event Description"/>
            <input type="date" name="date" className="bg-gray-50 w-100 text-gray-900"/>
            <input type="time" name="time" className="bg-gray-50 w-100 text-gray-900"/>
            <button type="submit">Create Event??</button>
        </form>
    )
}