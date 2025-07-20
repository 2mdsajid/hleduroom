
'use client';

import NoticeSection from '@/components/ui/notice-section';
import { getNotices } from '@/lib/actions/dashboard.actions';
import React, { useState, useEffect } from 'react';


// TypeScript type for the notice data from the database.
export type TNotice = {
    id: string;
    title: string;
    description: string;
    date: Date;
};

// Type for the notice after the date has been formatted for display.
type FormattedNotice = Omit<TNotice, 'date'> & {
    date: string;
};


const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4 py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="text-lg font-semibold text-gray-700">Loading Notices...</p>
    </div>
);



const NoticeList = () => {
  const [notices, setNotices] = useState<FormattedNotice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndFormatNotices = async () => {
      try {
        const allNotices = await getNotices();
        const formatted = allNotices.map(notice => ({
          ...notice,
          date: new Date(notice.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setNotices(formatted);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
        setError('Could not load notices. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFormatNotices();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>;
  }

  return <NoticeSection notices={notices} />;
};

export default NoticeList;

