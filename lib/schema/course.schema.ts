import { z } from 'zod';

// ... other schemas ...

export const CourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description is required.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  originalPrice: z.coerce.number().min(0, 'Original price must be a positive number.'),
  duration: z.string().min(1, 'Duration is required.'),
  image: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
  students: z.coerce.number().int().min(0, 'Students must be a whole number.'),
  rating: z.coerce.number().min(0).max(5, 'Rating must be between 0 and 5.'),
  reviews: z.coerce.number().int().min(0, 'Reviews must be a whole number.'),
  category: z.string().min(3, 'Category is required.'),
  level: z.string().min(3, 'Level is required.'),
  
  // Pre-process checkbox value "on" to a boolean
  isPopular: z.preprocess((val) => val === 'on', z.boolean()),

  // These will be handled in the server action before validation
  features: z.array(z.string()).min(1, 'At least one feature is required.'),
  whatYouLearn: z.array(z.string()).min(1, 'At least one learning outcome is required.'),
});

// ... other types ...

export type TCourse = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  image: string | null;
  students: number;
  rating: number;
  reviews: number;
  category: string;
  level: string;
  isPopular: boolean;
  features: string[];
  whatYouLearn: string[];
  createdAt: Date;
};