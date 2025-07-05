import React, { Suspense } from 'react';
import { getNotices } from '@/lib/actions/dashboard.actions';
import NoticeSection from '@/components/ui/notice-section';
import NoticeFallback from '../notice-fallback';

/**
 * An "inner" async component that handles the actual data fetching.
 * This is what will be "suspended" while it waits for the data.
 */
async function Notices() {
  const noticesFromDb = await getNotices();
  
  // You can limit how many notices to show on the home page
  const latestNotices = noticesFromDb.slice(0, 5);
  
  // Format the data to match what the NoticeSection component expects
  const formattedNotices = latestNotices.map(notice => ({
    ...notice,
    date: new Date(notice.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }));

  return <NoticeSection notices={formattedNotices} />;
}

/**
 * The main component you'll import into your page.
 * It uses Suspense to show a fallback while the <Notices> component fetches its data.
 */
const HomePageNoticeSection = () => {
  return (
    <Suspense fallback={<NoticeFallback />}>
      <Notices />
    </Suspense>
  );
};

export default HomePageNoticeSection;