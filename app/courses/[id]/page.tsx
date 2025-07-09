import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, BookOpen, Play, Download, MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Import the new server action
import { getCourseById } from "@/lib/actions/course.actions";
import { socialMediaLinks } from "@/lib/data/social-media";

// This function now fetches dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const course = await getCourseById(params.id);

  if (!course) {
    return {
      title: "Course Not Found - Hleduroom",
    };
  }

  return {
    title: `${course.title} - Hleduroom`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: { id:string } }) {
  // Fetch course data dynamically
  const course = await getCourseById(params.id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {course.rating} ({course.reviews} reviews)
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</span>
                  <span className="text-xl text-gray-500 line-through">Rs. {course.originalPrice.toLocaleString()}</span>
                  <Badge variant="destructive">{Math.round((1 - course.price / course.originalPrice) * 100)}% OFF</Badge>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={'https://docs.google.com/forms/d/e/1FAIpQLSemkKuEIESe-tL0TR7YgSQLBXGu8TQKydzQQjsKKizCo7IKmw/viewform'} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="lg" className="w-full"><Play className="h-5 w-5 mr-2" />Enroll Now</Button>
                </a>
                <a href={socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer">
                   <Button size="lg" variant="outline">Try Free Demo</Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center">
                 <a href={socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100"><Play className="h-6 w-6 mr-2" />Watch Preview</Button>
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Displaying Overview content directly without tabs */}
            <Card>
              <CardHeader><CardTitle>What You'll Learn</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.whatYouLearn?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Course Features</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader><CardTitle>Course Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</span>
                    <div className="text-sm text-gray-500 line-through">Rs. {course.originalPrice.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="font-medium">{course.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Students:</span><span className="font-medium">{course.students.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Level:</span><span className="font-medium">{course.level}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Category:</span><span className="font-medium">{course.category}</span></div>
                <div className="pt-4 border-t space-y-3">
                  <a href={'https://docs.google.com/forms/d/e/1FAIpQLSemkKuEIESe-tL0TR7YgSQLBXGu8TQKydzQQjsKKizCo7IKmw/viewform'} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full" size="lg"><Play className="h-5 w-5 mr-2" />Enroll Now</Button>
                  </a>
                  {/* <Button variant="outline" className="w-full bg-transparent"><Download className="h-5 w-5 mr-2" />Download Brochure</Button> */}
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Money Back Guarantee</h4>
                  <p className="text-sm text-gray-600">30-day money-back guarantee if you're not satisfied with the course.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}