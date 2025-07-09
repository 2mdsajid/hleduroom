import { Suspense } from "react";
import CourseGrid from "@/components/course-grid";
import type { Metadata } from "next";

// Import your server action to get the courses
import { getCourses } from "@/lib/actions/course.actions";

export const metadata: Metadata = {
  title: "Courses - Hleduroom",
  description: "Browse our comprehensive collection of NEB, CEE, and MBBS entrance preparation courses.",
};

// Make the page component async to fetch data
export default async function CoursesPage() {
  
  // Fetch the courses on the server
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">Choose from our wide range of courses designed to help you succeed.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-lg" />}>
              {/* Pass the fetched courses to the CourseGrid component */}
              <CourseGrid courses={courses} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}