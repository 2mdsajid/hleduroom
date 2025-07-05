'use client';

import { deleteNotice } from '@/lib/actions/dashboard.actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Delete notice"
      className="p-1 text-gray-400 hover:text-red-600 rounded-full transition-colors duration-200 disabled:opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}

export function DeleteNoticeButton({ noticeId }: { noticeId: string }) {
  return (
    <form action={deleteNotice}>
      <input type="hidden" name="noticeId" value={noticeId} />
      <SubmitButton />
    </form>
  );
}