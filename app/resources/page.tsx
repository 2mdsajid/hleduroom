import NoteBrowser from '@/components/note-browser';
import React from 'react';

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Study Notes & Resources 📚
        </h1>
        
        {/* Render the client component that handles all the logic */}
        <NoteBrowser />

      </div>
    </main>
  );
};

export default Page;