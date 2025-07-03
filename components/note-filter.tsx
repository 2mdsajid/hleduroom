"use client"; // This directive marks it as a client component

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterControlsProps {
  uniqueSubjects: string[];
  // New prop: A map of subjects to their unique chapters
  subjectChapterMap: { [subject: string]: string[] };
}

const FilterControls= ({ uniqueSubjects, subjectChapterMap }:FilterControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSubject = searchParams.get('subject') || 'all';
  const selectedChapter = searchParams.get('chapter') || 'all';

  // Dynamically determine chapters to show based on selectedSubject
  const chaptersToShow = useMemo(() => {
    if (selectedSubject === 'all') {
      // If 'all subjects' is selected, show all unique chapters from the map
      const allChapters = new Set<string>();
      Object.values(subjectChapterMap).forEach(chapters => {
        chapters.forEach(chapter => allChapters.add(chapter));
      });
      return ['all', ...Array.from(allChapters).sort()];
    } else {
      // Show only chapters for the selected subject
      const chaptersForSubject = subjectChapterMap[selectedSubject] || [];
      return ['all', ...chaptersForSubject.sort()];
    }
  }, [selectedSubject, subjectChapterMap]);

  const handleSubjectChange = (subject: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subject === 'all') {
      params.delete('subject');
    } else {
      params.set('subject', subject);
    }
    // IMPORTANT: Reset chapter filter when subject changes
    params.delete('chapter');
    router.push(`?${params.toString()}`);
  };

  const handleChapterChange = (chapter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (chapter === 'all') {
      params.delete('chapter');
    } else {
      params.set('chapter', chapter);
    }
    router.push(`?${params.toString()}`);
  };

  const formatChapterName = (chapter: string) => {
    // Replace underscores with spaces and capitalize each word
    return chapter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Resources</h2>
      
      <div className="mb-6">
        <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject:</label>
        <div className="flex flex-wrap gap-3">
          {uniqueSubjects.map(subject => (
            <button
              key={subject}
              onClick={() => handleSubjectChange(subject)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedSubject === subject
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {subject === 'all' ? 'All Subjects' : subject.charAt(0).toUpperCase() + subject.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="chapter-filter" className="block text-sm font-medium text-gray-700 mb-2">Filter by Chapter:</label>
        <div className="flex flex-wrap gap-3">
          {chaptersToShow.map(chapter => (
            <button
              key={chapter}
              onClick={() => handleChapterChange(chapter)}
              // Disable chapter filter if 'all subjects' is selected and a specific chapter is active but not in the new list
              disabled={selectedSubject !== 'all' && chaptersToShow.indexOf(selectedChapter) === -1 && chapter === selectedChapter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedChapter === chapter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
                ${selectedSubject !== 'all' && chaptersToShow.indexOf(selectedChapter) === -1 && chapter === selectedChapter ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {chapter === 'all' ? 'All Chapters' : formatChapterName(chapter)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;