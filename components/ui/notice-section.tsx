'use client'; // 1. This is now a client component to handle state and user interaction

import React, { useState } from 'react';
import Link from 'next/link';

// Define the type for a single notice item
interface Notice {
  id: string;
  title: string;
  description: string;
  date: any;
}

// Define the props for the NoticeSection component
interface NoticeSectionProps {
  notices: Notice[];
  viewAllLink?: string; // Optional prop for the "View All" link
}

const NoticeSection: React.FC<NoticeSectionProps> = ({ notices, viewAllLink = '/notices' }) => {
  // 2. State to track the ID of the currently expanded notice
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  // 3. Function to toggle the expanded state of a notice
  const handleNoticeClick = (noticeId: string) => {
    if (expandedNoticeId === noticeId) {
      setExpandedNoticeId(null); // Collapse if it's already open
    } else {
      setExpandedNoticeId(noticeId); // Expand the clicked notice
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
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
        <Link href={viewAllLink} className="flex items-center text-sm font-semibold hover:underline">
          View All
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
        </Link>
      </div>

      {/* Notices List */}
      <div className="p-4 divide-y divide-gray-200">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.id}
              className="flex py-4 first:pt-0 last:pb-0 cursor-pointer" // 5. Added cursor-pointer
              onClick={() => handleNoticeClick(notice.id)} // 3. Added click handler
            >
              <div className="relative flex-shrink-0 mr-4">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-red-500 top-0 bottom-0 z-0"></div>
                <div className="relative z-10 bg-white p-1 rounded-full text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-grow">
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-1 leading-tight">{notice.title}</h3>
                  {notice.description && (
                    <p
                      // 4. Conditional class for expanding/collapsing the description
                      className={`text-gray-700 text-sm mb-1 transition-all duration-300 ease-in-out ${
                        expandedNoticeId === notice.id ? 'line-clamp-none' : 'line-clamp-2'
                      }`}
                    >
                      {notice.description}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs">{new Date(notice.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No notices available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NoticeSection;
