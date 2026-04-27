import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface HomeButtonProps {
  href?: string;
  position?: "top-left" | "top-right";
  label?: string;
}

export default function HomeButton({
  href = "/dashboard",
  position = "top-right",
  label = "Home",
}: HomeButtonProps) {
  const positionClasses = position === "top-left" ? "left-4" : "right-4";

  return (
    <div className={`absolute top-4 ${positionClasses} sm:top-6`}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-slate-100 shadow-md shadow-slate-900/40 hover:bg-slate-600 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {label}
      </Link>
    </div>
  );
}
