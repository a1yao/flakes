import { redirect } from "next/navigation";
import { auth, signOut } from "../../auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import EventsList from "../ui/events_list";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/login');
  }
  
    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
            <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
          <Link href="/create-event" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            Create Event
          </Link>
          <EventsList userId={user.id}/>

        </form>

        <p>Welcome, {user.name}!</p>
        </div>
        
    )
}