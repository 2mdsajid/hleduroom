'use client';

import { deleteNote } from '@/lib/actions/dashboard.actions';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-fit h-fit bg-red-600"
    >
      <svg /* ... icon ... */ ></svg>
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}

export function DeleteNoteButton({ noteId }: { noteId: string }) {
  return (
    
    <form action={deleteNote} className=''>
      <input type="hidden" name="noteId" value={noteId} />
      <SubmitButton />
    </form>
  );
}