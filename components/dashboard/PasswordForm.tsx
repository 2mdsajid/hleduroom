'use client';

import { verifyPasswordAndSetCookie } from '@/lib/actions/dashboard.actions';
import { useFormState, useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
    >
      {pending ? 'Verifying...' : 'Unlock Dashboard'}
    </button>
  );
};

export const PasswordForm = () => {
  const [state, formAction] = useFormState(verifyPasswordAndSetCookie, undefined);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Dashboard Access</h2>
        <p className="text-center text-gray-500 mb-8">Please enter the password to continue.</p>

        <form action={formAction}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200"
              required
            />
          </div>
          <SubmitButton />
          {state?.error && (
            <p className="mt-4 text-center text-sm text-red-600">{state.error}</p>
          )}
        </form>
      </div>
    </div>
  );
};