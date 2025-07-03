import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, BookOpen, Play } from "lucide-react"
import Link from "next/link"
import { allCourses } from "@/lib/data/courses"



export default function CourseGrid() {
  return (
    <div className="space-y-6">


      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                {course.isPopular && <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>}
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-white">
                  {course.level}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
              <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>

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
                  <Badge variant="destructive" className="text-xs">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
                {/* <p className="text-sm text-gray-600">By {course.tutor}</p> */}
              </div>

              <div className="space-y-2">
                {course.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                    {feature}
                  </div>
                ))}
                {course.features.length > 3 && (
                  <p className="text-sm text-gray-500">+{course.features.length - 3} more features</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex space-x-2">
              <Link href={`/courses/${course.id}`} className="flex-1">
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Enroll Now
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="outline" size="lg">
          Load More Courses
        </Button>
      </div>
    </div>
  )
}
