import { Suspense } from "react"
import CourseFilters from "@/components/course-filters"
import CourseGrid from "@/components/course-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Courses - Hleduroom",
  description: "Browse our comprehensive collection of NEB, CEE, and MBBS entrance preparation courses",
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">Choose from our wide range of courses designed to help you succeed</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-lg" />}>
              <CourseGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
