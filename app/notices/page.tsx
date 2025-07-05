import NoticeSection from '@/components/ui/notice-section';
import { getNotices } from '@/lib/actions/dashboard.actions';
import React from 'react';

type Props = {}

const AllNoticesPage = async (props: Props) => {
  // 1. Fetch notices from the database
  const allNotices = await getNotices();

  // 2. Format the data to convert the Date object to a string
  const formattedNotices = allNotices.map(notice => ({
    ...notice,
    date: new Date(notice.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">All Notices</h1>
        
        {/* 3. Pass the newly formatted notices to the component */}
        <NoticeSection notices={formattedNotices} viewAllLink="" />

      </div>
    </div>
  )
}

export default AllNoticesPage;