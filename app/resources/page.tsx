import React from 'react';
import { getNotes } from '@/lib/actions/dashboard.actions';
import { TNote } from '@/lib/schema/dashboard.schema';
import FilterControls from '@/components/note-filter';
import { DeleteNoteButton } from '@/components/note-delete-button';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Helper function to get unique filter data including levels
const getFilterData = (notes: TNote[]) => {
  const subjects = new Set<string>();
  const levels = new Set<string>(); // 1. Set for unique levels
  const subjectChapterMap: { [subject: string]: string[] } = {};

  notes.forEach(note => {
    subjects.add(note.subject);
    if (note.level) { // Ensure level exists before adding
      levels.add(note.level);
    }
    
    if (!subjectChapterMap[note.subject]) {
      subjectChapterMap[note.subject] = [];
    }
    if (!subjectChapterMap[note.subject].includes(note.chapter)) {
      subjectChapterMap[note.subject].push(note.chapter);
    }
  });

  for (const subject in subjectChapterMap) {
    subjectChapterMap[subject].sort();
  }

  return {
    uniqueSubjects: ['all', ...Array.from(subjects).sort()],
    uniqueLevels: ['all', ...Array.from(levels).sort()], // 2. Return unique levels
    subjectChapterMap: subjectChapterMap,
  };
};

// Helper to format chapter names for display
const formatChapterName = (chapter: string) => {
  return chapter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Helper to extract YouTube video ID and create an embeddable URL
const getYouTubeEmbedUrl = (url: string | null): string | null => {
  if (!url) return null;
  try {
    const videoUrl = new URL(url);
    const videoId = videoUrl.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (error) {
    console.error("Invalid YouTube URL:", error);
    return null;
  }
};

const Page = async ({ searchParams }: Props) => {
  const notes = await getNotes() as TNote[];

  const selectedSubject = searchParams?.subject as string || 'all';
  const selectedChapter = searchParams?.chapter as string || 'all';
  const selectedLevel = searchParams?.level as string || 'all'; // 3. Get selected level from params

  // Filter notes based on URL search parameters, including level
  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    const matchesChapter = selectedChapter === 'all' || note.chapter === selectedChapter;
    const matchesLevel = selectedLevel === 'all' || note.level === selectedLevel; // 4. Add level to filter logic
    return matchesSubject && matchesChapter && matchesLevel;
  });

  const { uniqueSubjects, subjectChapterMap, uniqueLevels } = getFilterData(notes);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Study Notes & Resources</h1>

        <FilterControls
          uniqueSubjects={uniqueSubjects}
          subjectChapterMap={subjectChapterMap}
          uniqueLevels={uniqueLevels} // 5. Pass unique levels to filter controls
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => {
              const embedUrl = getYouTubeEmbedUrl(note.youtubeUrl);
              return (
                <div key={note.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  
                  <div className="p-6 flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{note.title}</h2>
                    <div className="flex flex-wrap gap-x-4 mb-4 text-sm">
                      <p className="font-medium text-indigo-600">
                        Subject: <span className="font-normal capitalize">{note.subject}</span>
                      </p>
                      {/* 6. Display the level on the card */}
                      {note.level && (
                        <p className="font-medium text-teal-600">
                          Level: <span className="font-normal capitalize">{note.level}</span>
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-4">
                      Chapter: <span className="font-normal">{formatChapterName(note.chapter)}</span>
                    </p>

                    {embedUrl && (
                      <div className="mb-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Video Lecture:</h3>
                        <div className="relative aspect-video">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                            src={embedUrl}
                            title={note.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <a
                          href={note.youtubeUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    )}

                    {note.pdfLink && (
                      <div className="mb-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">PDF Notes:</h3>
                        <a
                          href={note.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Download/View PDF
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
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
