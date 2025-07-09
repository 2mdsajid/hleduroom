'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addCourse } from '@/lib/actions/course.actions';

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
      {pending ? 'Adding Course...' : 'Add Course'}
    </button>
  );
}

export const CourseForm = () => {
  const [state, formAction] = useFormState(addCourse, initialState);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Add a New Course</h3>
      <form action={formAction}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input type="text" id="title" name="title" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea id="description" name="description" rows={4} required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          
          {/* Prices */}
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
            <input type="number" id="price" name="price" required step="0.01" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="originalPrice" className="block text-gray-700 text-sm font-bold mb-2">Original Price ($)</label>
            <input type="number" id="originalPrice" name="originalPrice" required step="0.01" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Duration & Level */}
          <div>
            <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
            <input type="text" id="duration" name="duration" required placeholder="e.g., 8 weeks" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">Level</label>
            <input type="text" id="level" name="level" required placeholder="e.g., Beginner" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          {/* Category & Image */}
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input type="text" id="category" name="category" required placeholder="e.g., Web Development" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input type="url" id="image" name="image" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          {/* Student Info */}
          <div>
            <label htmlFor="students" className="block text-gray-700 text-sm font-bold mb-2">Enrolled Students</label>
            <input type="number" id="students" name="students" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating (0-5)</label>
            <input type="number" id="rating" name="rating" required step="0.1" min="0" max="5" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="reviews" className="block text-gray-700 text-sm font-bold mb-2">Number of Reviews</label>
            <input type="number" id="reviews" name="reviews" required className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* String Arrays */}
          <div className="md:col-span-2">
            <label htmlFor="whatYouLearn" className="block text-gray-700 text-sm font-bold mb-2">What You'll Learn (comma-separated)</label>
            <input type="text" id="whatYouLearn" name="whatYouLearn" required placeholder="HTML, CSS, JavaScript" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
           <div className="md:col-span-2">
            <label htmlFor="features" className="block text-gray-700 text-sm font-bold mb-2">Features (comma-separated)</label>
            <input type="text" id="features" name="features" required placeholder="Lifetime access, Certificate" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Boolean Checkbox */}
          <div className="md:col-span-2 flex items-center gap-x-3">
            <input id="isPopular" name="isPopular" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
            <label htmlFor="isPopular" className="block text-sm font-medium leading-6 text-gray-900">Mark as Popular</label>
          </div>
        </div>
        <SubmitButton />
        {state?.message && <p className="text-sm text-green-600 mt-4">{state.message}</p>}
      </form>
    </div>
  );
};