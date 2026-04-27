'use client';

import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function CopyLinkButton({ eventId }: { eventId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/event/${eventId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 rounded-[2rem] bg-slate-800 p-6 shadow-inner shadow-slate-900/30">
      <h2 className="text-lg font-semibold text-slate-100 mb-3">Share Event</h2>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-2xl bg-slate-700 px-4 py-2.5 text-sm text-slate-400 truncate select-all">
          {typeof window !== 'undefined' ? `${window.location.origin}/event/${eventId}` : `/event/${eventId}`}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-2.5 text-sm text-white hover:bg-sky-500 transition-colors shrink-0"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardIcon className="h-4 w-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}