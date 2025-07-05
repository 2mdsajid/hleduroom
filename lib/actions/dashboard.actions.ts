'use server'

import { User } from "../generated/prisma";
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NoteSchema, NoticeSchema } from "../schema/dashboard.schema";

import { cookies } from 'next/headers';



// For security, we define a type that is the same as the User model but omits the password.
type UserWithoutPassword = Omit<User, 'password'>;

// Define the structure of the object that the function will return
interface LoginResponse {
  data: UserWithoutPassword | null;
  message: string;
}


export async function login(email?: string, password?: string): Promise<LoginResponse> {
  try {
    if (!email || !password) {
      return { data: null, message: 'Email and password are required.' };
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return { data: null, message: 'Invalid credentials.' };
    if (user.password !== password) return { data: null, message: 'Invalid credentials.' };

    const { password: _, ...userWithoutPassword } = user;
    return { data: userWithoutPassword, message: 'Login successful.' };

  } catch (error) {
    console.error('Login function error:', error);
    return { data: null, message: 'An internal server error occurred.' };
  }
}

// --- THIS IS THE NEW ACTION THE FORM WILL CALL ---
export async function verifyPasswordAndSetCookie(prevState: any, formData: FormData) {
  
  const cookieStore = await cookies()


  const password = formData.get('password') as string;
  if (!password) {
    return { error: 'Password is required.' };
  }

  const loginResult = await login('admin@hleduroom.com', password); // Replace with your admin's email

  if (loginResult.data) {
    cookieStore.set('dashboard_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });
    revalidatePath('/dashboard'); // Refresh the page to show content
    return { success: true };
  } else {
    return { error: loginResult.message };
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('dashboard_auth');
  revalidatePath('/dashboard');
}


// --- Note Actions ---


export async function addNote(prevState: any, formData: FormData) {
  // A more robust way to get all form fields for Zod
  const validatedFields = NoteSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  try {
    await prisma.note.create({
      data: validatedFields.data,
    });
    revalidatePath('/dashboard');
    // Ensure 'errors' is null on success for consistent state shape
    return { message: 'Note added successfully.', errors: null };
  } catch (error) {
    console.error('Failed to create note:', error);
    return { message: 'Database error: Failed to add note.', errors: null };
  }
}



export async function getNotes() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return notes;
  } catch (error) {
    console.error('Database error: Failed to get notes.', error)
    return [];
  }
}

export async function deleteNote(formData: FormData) {
  const noteId = formData.get('noteId') as string;

  if (!noteId) {
    console.error('Delete Note Error: Invalid Note ID.');
    return; // Exit if no ID
  }

  try {
    await prisma.note.delete({
      where: { id: noteId },
    });

    // This is the most important part for updating the UI.
    revalidatePath('/notes');

  } catch (error) {
    console.error('Delete Note Error:', error);
    // You can still handle the error on the server, but don't return an object.
  }
}

// --- Notice Actions ---


export async function addNotice(prevState: any, formData: FormData) {
  const validatedFields = NoticeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  try {
    await prisma.notice.create({
      data: validatedFields.data,
    });
    revalidatePath('/dashboard');
     // Ensure 'errors' is null on success for consistent state shape
    return { message: 'Notice added successfully.', errors: null };
  } catch (error) {
    console.error('Failed to create notice:', error);
    return { message: 'Database error: Failed to add notice.', errors: null };
  }
}



export async function getNotices() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { date: 'desc' },
    });
    return notices;
  } catch (error) {
    console.error('Database error: Failed to get notices.', error);
    return [];
  }
}


export async function deleteNotice(formData: FormData) {
  const noticeId = formData.get('noticeId') as string;

  if (!noticeId) {
    console.error('Delete Notice Error: Invalid Notice ID.');
    return;
  }

  try {
    await prisma.notice.delete({
      where: { id: noticeId },
    });

    // Revalidate both the notices page and the home page
    revalidatePath('/notices');
    revalidatePath('/'); // In case the notice section is on the home page

  } catch (error) {
    console.error('Delete Notice Error:', error);
  }
}