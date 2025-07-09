import { cookies } from 'next/headers';

// --- ACTIONS ---
import { getNotes, getNotices, logout } from '@/lib/actions/dashboard.actions';
import { getCourses } from '@/lib/actions/course.actions';

// --- SCHEMAS / TYPES ---
import { TNote, TNotice } from '@/lib/schema/dashboard.schema';
import { TCourse } from '@/lib/schema/course.schema';

// --- COMPONENTS ---
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { PasswordForm } from '@/components/dashboard/PasswordForm';
import { Button } from '@/components/ui/button';
import { NoteForm } from '@/components/dashboard/NoteForm';
import { NoticeForm } from '@/components/dashboard/NoticeForm';
import { DeleteNoteButton } from '@/components/note-delete-button';
import { DeleteNoticeButton } from '@/components/notice-delete-button';
import { DeleteCourseButton } from '@/components/course-delet-button';
import { CourseForm } from '@/components/course-form';
import { Contact } from '@/lib/generated/prisma';
import { getAllContacts } from '@/lib/actions/contact.actions';
import { getMockTests, deleteMockTest } from '@/lib/actions/mocktest.actions'; // Import mock test actions

import { MockTestForm } from '@/components/mock-test-form'; // Import mock test form
import { TMockTest } from '@/lib/schema/mocktest.schema';


// --- NotesList Component ---
const NotesList = ({ notes }: { notes: TNote[] }) => (
    <div className="mt-12 lg:mt-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Existing Notes</h3>
        <div className="space-y-4">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-gray-800">{note.title}</h4>
                            <p className="text-gray-600">Subject: {note.subject} - Chapter: {note.chapter}</p>
                            <div className="mt-2">
                                <a href={note.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View PDF</a>
                                {note.youtubeUrl && <a href={note.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline ml-4">Watch Video</a>}
                            </div>
                        </div>
                        <div className="flex-shrink-0 ml-4"><DeleteNoteButton noteId={note.id} /></div>
                    </div>
                ))
            ) : <p className="text-gray-500">No notes have been added yet.</p>}
        </div>
    </div>
);

// --- NoticesList Component ---
const NoticesList = ({ notices }: { notices: TNotice[] }) => (
    <div className="mt-12 lg:mt-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Posted Notices</h3>
        <div className="space-y-4">
            {notices.length > 0 ? (
                notices.map((notice) => (
                    <div key={notice.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-gray-800">{notice.title}</h4>
                            <p className="text-gray-600 mt-1">{notice.description}</p>
                            <p className="text-xs text-gray-400 mt-2">Posted on: {new Date(notice.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4"><DeleteNoticeButton noticeId={notice.id} /></div>
                    </div>
                ))
            ) : <p className="text-gray-500">No notices have been posted yet.</p>}
        </div>
    </div>
);

// --- CoursesList Component ---
const CoursesList = ({ courses }: { courses: TCourse[] }) => (
    <div className="mt-12 lg:mt-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Existing Courses</h3>
        <div className="space-y-6">
            {courses.length > 0 ? (
                courses.map((course) => (
                    <div key={course.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start gap-4">
                        <div className="flex-1">
                            {course.image && <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md mb-4" />}
                            <h4 className="font-bold text-xl text-gray-800">{course.title}</h4>
                            {/* ... other course details ... */}
                        </div>
                        <div className="flex-shrink-0"><DeleteCourseButton courseId={course.id} /></div>
                    </div>
                ))
            ) : <p className="text-gray-500">No courses have been added yet.</p>}
        </div>
    </div>
);


const ContactsList = ({ contacts }: { contacts: Contact[] }) => (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Contact Messages</h2>
        {contacts.length > 0 ? (
            contacts.map((contact) => (
                <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md border">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-lg text-gray-900">{contact.subject}</p>
                            <p className="text-sm text-gray-500">
                                From: <span className="font-medium text-gray-700">{contact.name}</span> ({contact.email})
                            </p>
                            <p className="text-sm text-gray-500">
                                Inquiry: <span className="font-medium text-gray-700">{contact.category}</span>
                                {contact.phone && ` | Phone: ${contact.phone}`}
                            </p>
                        </div>
                        <div className="text-xs text-gray-400">
                            {new Date(contact.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <p className="mt-4 text-gray-800 bg-gray-50 p-4 rounded-md border">{contact.message}</p>
                </div>
            ))
        ) : (
            <div className="text-center py-12">
                 <p className="text-gray-500 mt-4">No contact messages found.</p>
            </div>
        )}
    </div>
);

function DeleteMockTestButton({ id }: { id: string }) {
  return (
      <form action={deleteMockTest}>
          <input type="hidden" name="id" value={id} />
          <Button type="submit" variant="destructive" size="sm">Delete</Button>
      </form>
  );
}

const MockTestsList = ({ tests }: { tests: TMockTest[] }) => (
  <div className="mt-12 lg:mt-0">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Existing Mock Tests</h3>
      <div className="space-y-4">
          {tests.length > 0 ? (
              tests.map((test) => (
                  <div key={test.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                      <p className="font-medium text-gray-800">{test.title}</p>
                      <div className="flex items-center gap-4">
                          <a href={test.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View Test</a>
                          <DeleteMockTestButton id={test.id} />
                      </div>
                  </div>
              ))
          ) : <p className="text-gray-500">No mock tests have been added yet.</p>}
      </div>
  </div>
);

// --- Main Dashboard Content ---
const DashboardContent = async () => {
    const [notes, notices, courses, contacts, mockTests] = await Promise.all([
        getNotes(),
        getNotices(),
        getCourses(),
        getAllContacts(),
        getMockTests(), // Fetch mock tests
    ]);

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

    const coursesSection = (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CourseForm />
            <CoursesList courses={courses} />
        </div>
    );
    
    // Define the new contacts section
    const contactsSection = <ContactsList contacts={contacts} />;

    const mockTestsSection = (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <MockTestForm />
        <MockTestsList tests={mockTests} />
      </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage your notes, notices, courses, and contacts.</p>
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
                coursesSection={coursesSection}
                contactsSection={contactsSection}
                mockTestsSection={mockTestsSection} // Pass mock tests section
            />
        </div>
    );
}

// --- Page Entry Point ---
const Page = async () => {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('dashboard_auth')?.value === 'true';

    return isLoggedIn ? <DashboardContent /> : <PasswordForm />;
};

export default Page;