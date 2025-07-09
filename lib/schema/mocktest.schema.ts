import {z} from 'zod'

// ... existing schemas
export const MockTestSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters.'),
    link: z.string().url('Please enter a valid URL for the mock test.'),
  });
  
  // ... existing types
  export type TMockTest = {
    id: string;
    title: string;
    link: string;
    createdAt: Date;
  };