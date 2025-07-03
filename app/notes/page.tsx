import React from 'react';
import { notes, TNote } from '@/lib/data/notes';
import FilterControls from '@/components/note-filter';

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};


// Helper function to get unique subjects and their associated chapters
const getFilterData = (notes: TNote[]) => {
  const subjects = new Set<string>();
  const subjectChapterMap: { [subject: string]: string[] } = {};

  notes.forEach(note => {
    subjects.add(note.subject);
    if (!subjectChapterMap[note.subject]) {
      subjectChapterMap[note.subject] = [];
    }
    // Only add if not already present to ensure unique chapters per subject
    if (!subjectChapterMap[note.subject].includes(note.chapter)) {
        subjectChapterMap[note.subject].push(note.chapter);
    }
  });

  // Sort chapters within each subject alphabetically
  for (const subject in subjectChapterMap) {
    subjectChapterMap[subject].sort();
  }

  return {
    uniqueSubjects: ['all', ...Array.from(subjects).sort()],
    subjectChapterMap: subjectChapterMap,
  };
};

const Page = async ({ searchParams }: Props) => {
  const selectedSubject = (searchParams as any)?.subject as string || 'all';
  const selectedChapter = (searchParams as any)?.chapter as string || 'all';

  // Filter notes based on URL search parameters
  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    const matchesChapter = selectedChapter === 'all' || note.chapter === selectedChapter;
    return matchesSubject && matchesChapter;
  });

  const { uniqueSubjects, subjectChapterMap } = getFilterData(notes);

  const formatChapterName = (chapter: string) => {
    // Replace underscores with spaces and capitalize each word
    return chapter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Study Notes & Resources</h1>

        {/* Filter Buttons Section (Client Component) */}
        <FilterControls
          uniqueSubjects={uniqueSubjects}
          subjectChapterMap={subjectChapterMap}
        />

        {/* Notes Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{note.title}</h2>
                  <p className="text-sm font-medium text-indigo-600 mb-2">
                    Subject: <span className="font-normal capitalize">{note.subject}</span>
                  </p>
                  <p className="text-sm font-medium text-blue-600 mb-4">
                    Chapter: <span className="font-normal">{formatChapterName(note.chapter)}</span>
                  </p>

                  {note.youtubeUrl && (
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Video Lecture:</h3>
                      <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                          src={`https://www.youtube.com/embed/${new URL(note.youtubeUrl).searchParams.get("v")}`}
                          title={note.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                        ></iframe>
                      </div>
                      <a
                        href={note.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Watch on YouTube
                      </a>
                    </div>
                  )}

                  {note.pdfLink && (
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">PDF Notes:</h3>
                      {/* <div className="relative" style={{ paddingBottom: '100%', height: 0 }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                          src={note.pdfLink}
                          title={`${note.title} PDF`}
                          frameBorder="0"
                          referrerPolicy="strict-origin-when-cross-origin"
                          seamless
                        ></iframe>
                      </div> */}
                      <a
                        href={note.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download/View PDF
                      </a>
                    </div>
                  )}

                  {!note.youtubeUrl && !note.pdfLink && (
                    <p className="text-gray-500 italic mt-4">No resources available for this note yet.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-xl py-10">
              No notes found for the selected filters.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;