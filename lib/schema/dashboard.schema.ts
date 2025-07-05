import { z } from 'zod';


export const NoteSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters.'),
    subject: z.string().min(3, 'Subject must be at least 3 characters.'),
    chapter: z.string().min(1, 'Chapter is required.'),
    youtubeUrl: z.string().url('Please enter a valid YouTube URL.').optional().or(z.literal('')),
    pdfLink: z.string().url('Please enter a valid PDF link.'),
  });


export const NoticeSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
  });


  export type TNote = {
    id: string;
    title: string;
    subject: string;
    chapter: string;
    youtubeUrl: string | null;
    pdfLink: string;
    createdAt: Date;
};

export type TNotice = {
    id: string;
    title: string;
    description: string;
    date: Date;
};