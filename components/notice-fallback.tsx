import React from 'react';

const NoticeFallback = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Header (Static) */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
          {/* Bell Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.04 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <h2 className="text-xl font-bold">Notice Board</h2>
        </div>
        <div className="flex items-center text-sm font-semibold">
          View All
          {/* Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      {/* Skeleton Notices List with Pulsing Animation */}
      <div className="p-4 divide-y divide-gray-200">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex py-4 first:pt-0 last:pb-0 animate-pulse">
            {/* Red vertical line and icon placeholder */}
            <div className="relative flex-shrink-0 mr-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200 top-0 bottom-0"></div>
              <div className="relative z-10 bg-gray-300 p-1 rounded-full w-6 h-6"></div>
            </div>

            {/* Notice Content Placeholder */}
            <div className="flex-grow space-y-3">
              <div className="h-5 bg-gray-300 rounded-md w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded-md w-full"></div>
                <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
              </div>
              <div className="h-3 bg-gray-300 rounded-md w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeFallback;