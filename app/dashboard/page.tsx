import { getNotes, getNotices, logout } from '@/lib/actions/dashboard.actions';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { NoteForm } from '@/components/dashboard/NoteForm';
import { NoticeForm } from '@/components/dashboard/NoticeForm';
import { TNote, TNotice } from '@/lib/schema/dashboard.schema'; // You should define these types
import { DeleteNoticeButton } from '@/components/notice-delete-button';
import { DeleteNoteButton } from '@/components/note-delete-button';

import { cookies } from 'next/headers';
import { PasswordForm } from '@/components/dashboard/PasswordForm';

// Section for displaying existing notes
const NotesList = ({ notes }: { notes: TNote[] }) => (
  <div className="mt-12">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">Existing Notes</h3>
    <div className="space-y-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold text-lg text-gray-800">{note.title}</h4>
            <p className="text-gray-600">Subject: {note.subject} - Chapter: {note.chapter}</p>
            <div className="mt-2">
              <a href={note.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View PDF</a>
              {note.youtubeUrl && <a href={note.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline ml-4">Watch Video</a>}
            </div>
            <p className="text-xs text-gray-400 mt-2">Added on: {new Date(note.createdAt).toLocaleDateString()}</p>
            <div className=" mt-3">
              <DeleteNoteButton noteId={note.id} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notes have been added yet.</p>
      )}
    </div>
  </div>
);

// Section for displaying existing notices
const NoticesList = ({ notices }: { notices: TNotice[] }) => (
  <div className="mt-12">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">Posted Notices</h3>
    <div className="space-y-4">
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice.id} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold text-lg text-gray-800">{notice.title}</h4>
            <p className="text-gray-600 mt-1">{notice.description}</p>
            <p className="text-xs text-gray-400 mt-2">Posted on: {new Date(notice.date).toLocaleDateString()}</p>
            <div className="flex-shrink-0">
              <DeleteNoticeButton noticeId={notice.id} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notices have been posted yet.</p>
      )}
    </div>
  </div>
);

const DashboardContent = async () => {
  // This component holds the actual dashboard UI
  const notes = await getNotes() as TNote[];
  const notices = await getNotices() as TNotice[];

  const notesSection = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <NoteForm />
      <NotesList notes={notes} />
    </div>
  );

  const noticesSection = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <NoticeForm />
      <NoticesList notices={notices} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your notes and notices from here.</p>
        </div>
        <form action={logout}>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
                Logout
            </button>
        </form>
      </header>
      <DashboardTabs
        notesSection={notesSection}
        noticesSection={noticesSection}
      />
    </div>
  );
}

const Page = async () => {
  // 3. Check if the auth cookie exists and is set to 'true'
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('dashboard_auth')?.value === 'true';

  // 4. Conditionally render the page content or the password form
  if (isLoggedIn) {
    return <DashboardContent />;
  } else {
    return <PasswordForm />;
  }
};

export default Page;