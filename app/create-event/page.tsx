import { Suspense } from "react";
import CreateEventForm from "../ui/createEvent-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CreateEventPage() {
    const session = await auth();
      const user = session?.user;
    
      if (!user) {
        redirect(`/login?callbackUrl=${encodeURIComponent(`/create-event`)}`);
      }
      
    return (
        <main className="flex items-center justify-center md:h-screen">
              <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                </div>
                <Suspense>
                  <CreateEventForm />
                </Suspense>
              </div>
            </main>
    )
}