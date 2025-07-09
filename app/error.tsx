'use client'; // This is a required directive for error components

import { Button } from "@/components/ui/button";
import { ServerCrash, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service or the console
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <ServerCrash className="h-24 w-24 mx-auto text-red-400 mb-6" />

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oops! Something went wrong.
        </h1>
        
        <p className="mt-4 text-lg text-gray-600">
          An unexpected error occurred on our end. Please try again, or return home if the issue persists.
        </p>

        {/* Optional: Display error message during development */}
        {process.env.NODE_ENV === 'development' && (
           <div className="mt-4 text-left bg-red-50 p-3 rounded-md border border-red-200">
             <p className="text-sm text-red-700 font-mono">{error.message}</p>
           </div>
        )}
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => reset()} size="lg">
            Try Again
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}