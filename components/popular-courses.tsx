'use client'; // 1. This is now a client component

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { TCourse } from "@/lib/schema/course.schema";
import { getCourses } from '@/lib/actions/course.actions';
import PopularCoursesSkeleton from './popular-course-skeleton';

export default function PopularCourses() {
  // 2. State for courses, loading, and error
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Fetch data when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const popularCourses = await getCourses();
        setCourses(popularCourses);
      } catch (err) {
        console.error("Failed to fetch popular courses:", err);
        setError("Could not load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on mount

  // 4. Show a loading skeleton while fetching
  if (isLoading) {
    return <PopularCoursesSkeleton />;
  }

  // 5. Handle errors during fetch
  if (error) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }
  
  // Don't render the section if no courses are found
  if (courses.length === 0) {
    return null;
  }

  // 6. Render the fetched data
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have achieved success with our top-rated courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {course.category}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{course.duration}</div>
                  <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{course.students.toLocaleString()}</div>
                  <div className="flex items-center"><Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />{course.rating}</div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</span>
                    <span className="text-lg text-gray-500 line-through">Rs. {course.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {course.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex space-x-2 mt-auto">
                <Link href={`/courses/${course.id}`} className="flex-1">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
