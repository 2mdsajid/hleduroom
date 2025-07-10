'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMockTests } from "@/lib/actions/mocktest.actions";
import { TMockTest } from "@/lib/schema/mocktest.schema";

// Skeleton component for loading state
const MockTestSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border animate-pulse">
    <div className="flex justify-between items-center">
      <div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded-md w-28"></div>
    </div>
  </div>
);


export default function MockTestsPage() {
  // State for storing the mock tests and the loading status
  const [mockTests, setMockTests] = useState<TMockTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch mock tests when the component mounts
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setIsLoading(true);
        const tests = await getMockTests();
        setMockTests(tests);
      } catch (error) {
        console.error("Failed to fetch mock tests:", error);
        // Optionally, you could set an error state here to show a message to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Available Mock Tests</h1>
          <p className="text-lg text-gray-600 mt-2">
            Test your knowledge with our collection of mock tests.
          </p>
        </header>

        <div className="space-y-6">
          {isLoading ? (
            // Show skeleton loaders while data is being fetched
            <>
              <MockTestSkeleton />
              <MockTestSkeleton />
              <MockTestSkeleton />
            </>
          ) : mockTests.length > 0 ? (
            // Render the list of mock tests once loaded
            mockTests.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{test.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {/* Ensure createdAt is a valid date string or timestamp before creating a Date object */}
                    Added on: {new Date(test.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link href={test.link} target="_blank" rel="noopener noreferrer">
                  <Button>
                    Take Test
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            // Show a message if no tests are available after loading
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No mock tests have been added yet. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
