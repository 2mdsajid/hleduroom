import { getMockTests } from "@/lib/actions/mocktest.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TMockTest } from "@/lib/schema/mocktest.schema";

// The page is now an async function to allow for data fetching
export default async function MockTestsPage() {
  const mockTests: TMockTest[] = await getMockTests();

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
          {mockTests.length > 0 ? (
            mockTests.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{test.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
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
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No mock tests have been added yet. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}