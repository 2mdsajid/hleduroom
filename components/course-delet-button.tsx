'use client';

import { useFormStatus } from 'react-dom';
import { deleteCourse } from '@/lib/actions/course.actions'; // Make sure the path is correct

export function DeleteCourseButton({ courseId }: { courseId: string }) {
  const { pending } = useFormStatus();

  return (
    <form action={deleteCourse}>
      <input type="hidden" name="courseId" value={courseId} />
      <button
        type="submit"
        disabled={pending}
        className="text-sm text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        aria-disabled={pending}
      >
        {pending ? 'Deleting...' : 'Delete'}
      </button>
    </form>
  );
}