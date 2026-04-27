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
        <main className="flex items-center justify-center md:h-screen">
          <HomeButton label="Cancel" />
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                  <Suspense>
                    <CreateEventForm />
                  </Suspense>
          </div>
        </main>
    )
}