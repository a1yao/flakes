'use client';

import { redirect } from "next/navigation";
import { createEvent } from "../lib/actions";

export default function CreateEventForm() {
    const handleSubmit = async (formData: FormData) => {
        const eventId = await createEvent(undefined, formData);
        redirect(`/event/${eventId}`);
    }
    return (
        <form action={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Event Name</label>
                <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required
                    className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all" 
                    placeholder="Enter event name"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea 
                    id="description"
                    name="description" 
                    required
                    rows={4}
                    className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all resize-none" 
                    placeholder="Describe your event"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                    <input 
                        type="date" 
                        id="date"
                        name="date" 
                        required
                        className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-slate-100 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all" 
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                    <input 
                        type="time" 
                        id="time"
                        name="time" 
                        required
                        className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-slate-100 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all" 
                    />
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button 
                    type="submit"
                    className="flex-1 rounded-3xl bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-500 transition-colors shadow-md shadow-slate-900/40"
                >
                    Create Event
                </button>
            </div>
        </form>
    )
}