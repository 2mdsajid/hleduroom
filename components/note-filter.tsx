"use client";

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterControlsProps {
  uniqueSubjects: string[];
  subjectChapterMap: { [subject: string]: string[] };
  uniqueLevels: string[]; // 1. Add uniqueLevels prop
}

const FilterControls = ({ uniqueSubjects, subjectChapterMap, uniqueLevels }: FilterControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSubject = searchParams.get('subject') || 'all';
  const selectedChapter = searchParams.get('chapter') || 'all';
  const selectedLevel = searchParams.get('level') || 'all'; // 2. Get selected level

  // Memoize chapters to show based on the selected subject
  const chaptersToShow = useMemo(() => {
    if (selectedSubject === 'all') {
      const allChapters = new Set<string>();
      Object.values(subjectChapterMap).forEach(chapters => {
        chapters.forEach(chapter => allChapters.add(chapter));
      });
      return ['all', ...Array.from(allChapters).sort()];
    }
    return ['all', ...(subjectChapterMap[selectedSubject] || []).sort()];
  }, [selectedSubject, subjectChapterMap]);

  // 3. Handle level changes
  const handleLevelChange = (level: string) => {
    const params = new URLSearchParams(); // Start with fresh params
    if (level !== 'all') {
      params.set('level', level);
    }
    // Reset subject and chapter when level changes
    router.push(`?${params.toString()}`);
  };

  const handleSubjectChange = (subject: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subject === 'all') {
      params.delete('subject');
    } else {
      params.set('subject', subject);
    }
    // Reset chapter when subject changes
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
    return chapter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="mb-10 p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Filter Resources</h2>
      
      {/* 4. Level Filter Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Level:</label>
        <div className="flex flex-wrap gap-3">
          {uniqueLevels.map(level => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedLevel === level
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject:</label>
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

      {/* Chapter Filter Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Chapter:</label>
        <div className="flex flex-wrap gap-3">
          {chaptersToShow.map(chapter => (
            <button
              key={chapter}
              onClick={() => handleChapterChange(chapter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedChapter === chapter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
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
