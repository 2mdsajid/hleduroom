import NoticeSection from '@/components/ui/notice-section';
import { notices } from '@/lib/data/notices';
import React from 'react';

// Sort notices by date in descending order (most recent first)
// This will ensure your notice board shows newer notices at the top.
const sortedNotices = notices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


type Props = {}

const AllNoticesPage = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">All Notices</h1>
        
        <NoticeSection notices={sortedNotices}  />

      </div>
    </div>
  )
}

export default AllNoticesPage;