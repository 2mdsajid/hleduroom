"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function CourseFilters() {
  const [priceRange, setPriceRange] = useState([0, 50000])

  const categories = [
    { id: "neb", label: "NEB Preparation", count: 15 },
    { id: "cee", label: "CEE Engineering", count: 8 },
    { id: "mbbs", label: "MBBS Entrance", count: 12 },
    { id: "notes", label: "Study Materials", count: 25 },
  ]

  const courseTypes = [
    { id: "free", label: "Free Courses", count: 5 },
    { id: "paid", label: "Premium Courses", count: 35 },
    { id: "live", label: "Live Classes", count: 20 },
    { id: "recorded", label: "Recorded Videos", count: 30 },
  ]

  const durations = [
    { id: "1-3", label: "1-3 months", count: 10 },
    { id: "3-6", label: "3-6 months", count: 15 },
    { id: "6-12", label: "6-12 months", count: 20 },
    { id: "12+", label: "12+ months", count: 8 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
              >
                {category.label}
              </label>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={50000} step={1000} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rs. {priceRange[0].toLocaleString()}</span>
              <span>Rs. {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Course Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courseTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox id={type.id} />
              <label
                htmlFor={type.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
              >
                {type.label}
              </label>
              <span className="text-xs text-gray-500">({type.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {durations.map((duration) => (
            <div key={duration.id} className="flex items-center space-x-2">
              <Checkbox id={duration.id} />
              <label
                htmlFor={duration.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
              >
                {duration.label}
              </label>
              <span className="text-xs text-gray-500">({duration.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )
}
