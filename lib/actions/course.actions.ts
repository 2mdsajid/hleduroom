'use server'

import { User } from "../generated/prisma";
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NoteSchema, NoticeSchema } from "../schema/dashboard.schema";

import { cookies } from 'next/headers';
import { CourseSchema } from "../schema/course.schema";
import { error } from "console";



// --- Course Actions ---

export async function addCourse(prevState: any, formData: FormData) {
    // Convert form data to a plain object
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject)
  
    // Manually process comma-separated strings into arrays
    const processedData = {
      ...formObject,
      features: formObject.features ? (formObject.features as string).split(',').map(s => s.trim()) : [],
      whatYouLearn: formObject.whatYouLearn ? (formObject.whatYouLearn as string).split(',').map(s => s.trim()) : [],
    };
  
    const validatedFields = CourseSchema.safeParse(processedData);
    console.log(validatedFields.error)
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation failed. Please check your inputs.',
      };
    }
  
    try {
      await prisma.course.create({
        data: validatedFields.data,
      });
      revalidatePath('/dashboard');
      return { message: 'Course added successfully.', errors: null };
    } catch (error) {
      console.error('Failed to create course:', error);
      return { message: 'Database error: Failed to add course.', errors: null };
    }
  }

  export async function getCourseById(id: string) {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
      });
      return course;
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  }
  
  // getCourses and deleteCourse remain the same as they only depend on the model name and ID.
  
  export async function getCourses() {
    try {
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return courses;
    } catch (error) {
      console.error('Database error: Failed to get courses.', error);
      return [];
    }
  }
  
  export async function deleteCourse(formData: FormData) {
    const courseId = formData.get('courseId') as string;
  
    if (!courseId) {
      console.error('Delete Course Error: Invalid Course ID.');
      return;
    }
  
    try {
      await prisma.course.delete({
        where: { id: courseId },
      });
      revalidatePath('/dashboard');
    } catch (error) {
      console.error('Delete Course Error:', error);
    }
  }