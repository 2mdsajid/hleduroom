'use client';

import { useState, useEffect, Suspense } from "react";
import CourseGrid from "@/components/course-grid";
// Assuming getCourses can also be called from the client.
// If not, you'll need an API route.
import { getCourses } from "@/lib/actions/course.actions";
import { CourseSchema, TCourse } from "@/lib/schema/course.schema";

// Note: The 'metadata' export is not used in client components.
// It should be defined in a parent server component or layout file.

export default function CoursesPage() {
  // State to store the courses and loading status
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Set loading to true before fetching
        setIsLoading(true);
        const fetchedCourses = await getCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        // Handle any potential errors during the fetch
        console.error("Failed to fetch courses:", error);
      } finally {
        // Set loading to false after the fetch is complete
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once on mount

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
            {/* Show a loading skeleton while data is being fetched */}
            {isLoading ? (
              <div className="h-96 animate-pulse bg-white rounded-lg" />
            ) : (
              // Once loaded, pass the fetched courses to the CourseGrid component
              <CourseGrid courses={courses} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
