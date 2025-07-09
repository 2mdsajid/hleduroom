// In /components/popular-courses-skeleton.tsx

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PopularCoursesSkeleton() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-10 bg-gray-200 rounded-md w-1/2 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md w-2/3 mx-auto mt-4 animate-pulse"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md mt-3 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded-md mt-2 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="space-y-3 mt-4">
                  <div className="h-4 w-4/5 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </CardContent>
              <CardFooter>
                 <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}