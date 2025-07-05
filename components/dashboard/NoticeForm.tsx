'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addNotice } from '@/lib/actions/dashboard.actions';

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
      {pending ? 'Adding Notice...' : 'Add Notice'}
    </button>
  );
}

export const NoticeForm = () => {
  const [state, formAction] = useFormState(addNotice, initialState);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Post a New Notice</h3>
        <form action={formAction}>
            <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Notice Title</label>
                <input type="text" id="title" name="title" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea id="description" name="description" rows={4} required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <SubmitButton />
            {state?.message && <p className="text-sm text-green-600 mt-4">{state.message}</p>}
        </form>
    </div>
  );
};