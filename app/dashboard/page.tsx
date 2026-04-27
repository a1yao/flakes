import { redirect } from "next/navigation";
import { auth, signOut } from "../../auth";
import { PowerIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import EventsList from "../ui/events_list";
import { Button } from "../ui/button";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="bg-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-slate-100">
              Welcome, {user.name}!
            </h1>
            <form action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}>
              <Button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors"
              >
                <PowerIcon className="w-5 h-5 text-white" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/create-event">
            <Button className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors">
              <PlusIcon className="w-5 h-5" />
              Create New Event
            </Button>
          </Link>
        </div>
        <Suspense>
          <EventsList userId={user.id} />
        </Suspense>
        
      </main>
    </div>
  );
}