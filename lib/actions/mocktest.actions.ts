'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from '../db';
import { MockTestSchema } from '../schema/mocktest.schema';

// --- ADD MOCK TEST ---
export async function addMockTest(prevState: any, formData: FormData) {
  const validatedFields = MockTestSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  try {
    await prisma.mockTest.create({
      data: validatedFields.data,
    });
    revalidatePath('/dashboard');
    return { message: 'Mock Test added successfully.', errors: null };
  } catch (error) {
    return { message: 'Database error: Failed to add Mock Test.', errors: null };
  }
}

// --- GET MOCK TESTS ---
export async function getMockTests() {
  try {
    const tests = await prisma.mockTest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return tests;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// --- DELETE MOCK TEST ---
export async function deleteMockTest(formData: FormData) {
  const id = formData.get('id') as string;
  try {
    await prisma.mockTest.delete({ where: { id } });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Delete Error:', error);
  }
}