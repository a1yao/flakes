import { Suspense } from "react";
import CreateEventForm from "../ui/createEvent-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import HomeButton from "../ui/home-button";

export default async function CreateEventPage() {
    const session = await auth();
      const user = session?.user;
    
      if (!user) {
        redirect(`/login?callbackUrl=${encodeURIComponent(`/create-event`)}`);
      }
      
    return (
        <main className="relative min-h-screen bg-slate-800 px-4 py-10 sm:px-6 lg:px-8 text-slate-100">
              <HomeButton label="Cancel" />
              <div className="mx-auto flex w-full max-w-2xl flex-col mt-10">
                <div className="rounded-[2rem] bg-slate-900/90 p-8 shadow-2xl shadow-slate-900/30">
                  <h1 className="text-3xl font-semibold text-slate-100 mb-2">Create Event</h1>
                  <p className="text-slate-300 mb-8">Fill in the details below to create a new event</p>
                  <Suspense>
                    <CreateEventForm />
                  </Suspense>
                </div>
              </div>
            </main>
    )
}