'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { redirect } from "next/navigation";
import { createEvent } from "../lib/actions";

export default function CreateEventForm() {
    const handleSubmit = async (formData: FormData) => {
        const eventId = await createEvent(undefined, formData);
        redirect(`/event/${eventId}`);
    }
    return (
        <form action={handleSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="w-full">
                    <div>
                        <h1 className={`mb-3 text-2xl text-gray-900`}>
                            Create a New Event
                        </h1>
                        <label htmlFor="name" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                            Event Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                            placeholder="Enter event name"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900 resize-none"
                            placeholder="Describe your event"
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                required
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 text-gray-900"
                            />
                        </div>
                    </div>
                </div>
                <Button className="mt-4 w-full" type="submit">
                    Create Event <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </div>
        </form>
    );
}