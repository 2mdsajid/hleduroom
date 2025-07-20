
import NoticeList from '@/components/notice-render';
import React from 'react';


const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">All Notices</h1>
          <NoticeList />
      </div>
    </div>
  )
}

export default page;