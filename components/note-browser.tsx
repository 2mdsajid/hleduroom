'use client';

import { getNotes } from '@/lib/actions/dashboard.actions';
import { TNote } from '@/lib/schema/dashboard.schema';
import React, { useState, useEffect, useMemo } from 'react';


export type TFilterData = {
    [level: string]: {
        [subject: string]: string[]
    }
};



// --- HELPER FUNCTIONS ---
const generateFilterData = (notes: TNote[]): TFilterData => {
    const filterData: TFilterData = {};
    notes.forEach(note => {
        const level = note.level || 'general';
        const { subject, chapter } = note;
        if (!filterData[level]) filterData[level] = {};
        if (!filterData[level][subject]) filterData[level][subject] = [];
        if (!filterData[level][subject].includes(chapter)) {
            filterData[level][subject].push(chapter);
        }
    });
    for (const level in filterData) {
        for (const subject in filterData[level]) {
            filterData[level][subject].sort();
        }
    }
    return filterData;
};

const formatName = (name: string) => {
    return name.split(/_|-/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getYouTubeEmbedUrl = (url: string | null): string => {
    if (!url) return '';
    try {
      const videoUrl = new URL(url);
      const videoId = videoUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return '';
    }
  };

// --- FILTER CONTROLS COMPONENT ---
interface FilterControlsProps {
    filterData: TFilterData;
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
    selectedSubject: string;
    setSelectedSubject: (subject: string) => void;
    selectedChapter: string;
    setSelectedChapter: (chapter: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
    filterData,
    selectedLevel, setSelectedLevel,
    selectedSubject, setSelectedSubject,
    selectedChapter, setSelectedChapter,
}) => {
    const levels = useMemo(() => ['all', ...Object.keys(filterData).sort()], [filterData]);

    const subjects = useMemo(() => {
        if (selectedLevel === 'all') {
            const allSubjects = new Set<string>();
            Object.values(filterData).forEach(levelData => Object.keys(levelData).forEach(subject => allSubjects.add(subject)));
            return ['all', ...Array.from(allSubjects).sort()];
        }
        return ['all', ...Object.keys(filterData[selectedLevel] || {}).sort()];
    }, [selectedLevel, filterData]);

    const chapters = useMemo(() => {
        if (selectedSubject === 'all') {
            const allChapters = new Set<string>();
            const relevantLevels = selectedLevel === 'all' ? Object.values(filterData) : [filterData[selectedLevel]];
            relevantLevels.forEach(levelData => {
                if (levelData) Object.values(levelData).forEach(chapterList => chapterList.forEach(chapter => allChapters.add(chapter)));
            });
            return ['all', ...Array.from(allChapters).sort()];
        }
        if (selectedLevel === 'all') {
            const allChaptersForSubject = new Set<string>();
            Object.values(filterData).forEach(levelData => {
                if (levelData[selectedSubject]) levelData[selectedSubject].forEach(ch => allChaptersForSubject.add(ch));
            });
            return ['all', ...Array.from(allChaptersForSubject).sort()];
        }
        return ['all', ...(filterData[selectedLevel]?.[selectedSubject] || [])];
    }, [selectedLevel, selectedSubject, filterData]);

    return (
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Filter </h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level:</label>
                <div className="flex flex-wrap gap-3">
                    {levels.map(level => (
                        <button key={level} onClick={() => { setSelectedLevel(level); setSelectedSubject('all'); setSelectedChapter('all'); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedLevel === level ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {formatName(level)}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                <div className="flex flex-wrap gap-3">
                    {subjects.map(subject => (
                        <button key={subject} onClick={() => { setSelectedSubject(subject); setSelectedChapter('all'); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedSubject === subject ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {formatName(subject)}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chapter:</label>
                <div className="flex flex-wrap gap-3">
                    {chapters.map(chapter => (
                        <button key={chapter} onClick={() => setSelectedChapter(chapter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedChapter === chapter ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {formatName(chapter)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN BROWSER COMPONENT ---
const NoteBrowser = () => {
    const [allNotes, setAllNotes] = useState<TNote[]>([]);
    const [filterData, setFilterData] = useState<TFilterData>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [selectedChapter, setSelectedChapter] = useState('all');

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const notes = await getNotes();
                setAllNotes(notes);
                setFilterData(generateFilterData(notes));
            } catch (err) {
                setError("Could not load resources.");
            } finally {
                setIsLoading(false);
            }
        };
        loadNotes();
    }, []);

    const filteredNotes = useMemo(() => {
        return allNotes.filter(note => {
            const level = note.level || 'general';
            const matchesLevel = selectedLevel === 'all' || level === selectedLevel;
            const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
            const matchesChapter = selectedChapter === 'all' || note.chapter === selectedChapter;
            return matchesLevel && matchesSubject && matchesChapter;
        });
    }, [allNotes, selectedLevel, selectedSubject, selectedChapter]);

    if (error) {
        return <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>;
    }

    return (
        <>
            <FilterControls
                filterData={filterData}
                selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
                selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
                selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
            />
            {isLoading ? (
                <div className="text-center p-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <div key={note.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                <div className="p-6 flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{note.title}</h2>
                                    <div className="flex flex-wrap gap-x-4 mb-4 text-sm">
                                        {note.level && <p className="font-medium text-teal-600">Level: <span className="font-normal capitalize">{formatName(note.level)}</span></p>}
                                        <p className="font-medium text-indigo-600">Subject: <span className="font-normal capitalize">{formatName(note.subject)}</span></p>
                                    </div>
                                    <p className="text-sm font-medium text-blue-600 mb-4">Chapter: <span className="font-normal">{formatName(note.chapter)}</span></p>
                                    {getYouTubeEmbedUrl(note.youtubeUrl) && (
                                        <div className="mb-5">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Video Lecture:</h3>
                                            <div className="relative aspect-video">
                                                <iframe
                                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                                                    src={note.youtubeUrl ? getYouTubeEmbedUrl(note.youtubeUrl) : ""}
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
                                    {note.pdfLink && <a href={note.pdfLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">View PDF</a>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600 text-xl py-10">No notes found for the selected filters.</div>
                    )}
                </div>
            )}
        </>
    );
};

export default NoteBrowser;