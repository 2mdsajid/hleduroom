import { Button } from "@/components/ui/button"
import { ArrowLeft, SearchX } from "lucide-react"
import Link from "next/link"
import React from 'react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <SearchX className="h-24 w-24 mx-auto text-gray-300 mb-6" />

        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        
        <div className="mt-10">
          <Link href="/">
            <Button size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}