'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addMockTest } from '@/lib/actions/mocktest.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState = { message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Adding Test...' : 'Add Mock Test'}
    </Button>
  );
}

export const MockTestForm = () => {
  const [state, formAction] = useFormState(addMockTest, initialState);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Mock Test</h3>
      <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="space-y-2">
          <Label htmlFor="title">Test Title</Label>
          <Input id="title" name="title" required placeholder="e.g., CEE Full Model Test 1" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Test Link</Label>
          <Input id="link" name="link" type="url" required placeholder="https://example.com/test-link" />
        </div>
        <SubmitButton />
        {state?.message && <p className="text-sm text-green-600 mt-4">{state.message}</p>}
      </form>
    </div>
  );
};