'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addNote } from '@/lib/actions/dashboard.actions';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-400"
    >
      {pending ? 'Adding Note...' : 'Add Note'}
    </button>
  );
}

export const NoteForm = () => {
  const [state, formAction] = useFormState(addNote, initialState);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Add a New Note</h3>
        <form action={formAction}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input type="text" id="title" name="title" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <div>
                    <label htmlFor="chapter" className="block text-gray-700 text-sm font-bold mb-2">Chapter</label>
                    <input type="text" id="chapter" name="chapter" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                    <input 
                      type="text" 
                      id="level" 
                      name="level" 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Class 11, CEE"
                    />
                </div>
                 <div>
                    <label htmlFor="pdfLink" className="block text-gray-700 text-sm font-bold mb-2">PDF Link</label>
                    <input type="url" id="pdfLink" name="pdfLink" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/note.pdf" />
                </div>
                 <div className="md:col-span-2">
                    <label htmlFor="youtubeUrl" className="block text-gray-700 text-sm font-bold mb-2">YouTube URL (Optional)</label>
                    <input type="url" id="youtubeUrl" name="youtubeUrl" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://youtube.com/watch?v=video-id"/>
                </div>
            </div>
            <SubmitButton />
            {state?.message && <p className="text-sm text-green-600 mt-4">{state.message}</p>}
        </form>
    </div>
  );
};