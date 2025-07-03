import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { allCourses } from "@/lib/data/courses"


export default function PopularCourses() {
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
          {allCourses.slice(0, 3).map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {course.category}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <p className="text-gray-600 text-sm">{course.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</span>
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  {/* <p className="text-sm text-gray-600">By {course.tutor}</p> */}
                </div>

                <div className="space-y-2">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex space-x-2">
                <Link href={`/courses/${course.id}`} className="flex-1">
                  <Button className="w-full">Enroll Now</Button>
                </Link>
                <Button variant="outline" size="sm">
                  Try Demo
                </Button>
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
