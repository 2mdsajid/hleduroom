'use server'

import prisma from "../db";
import {  User } from "../generated/prisma";

// For security, we define a type that is the same as the User model but omits the password.
type UserWithoutPassword = Omit<User, 'password'>;

// Define the structure of the object that the function will return
interface LoginResponse {
  data: UserWithoutPassword | null;
  message: string;
}


export async function login(email?: string, password?: string): Promise<LoginResponse> {
    try {
      // 1. Basic validation: Ensure email and password are provided
      if (!email || !password) {
        return { data: null, message: 'Email and password are required.' };
      }

      console.log(email,password)
  
      // 2. Find the user in the database using Prisma
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      // 3. If user doesn't exist, return a generic error
      if (!user) {
        return { data: null, message: 'Invalid credentials.' };
      }
  
      // 4. Compare the provided password with the hashed password in the database

  
      if (user.password !== password) {
        return { data: null, message: 'Invalid credentials.' };
      }
  
      // 5. If credentials are valid, remove the password from the user object
      const { password: _, ...userWithoutPassword } = user;
  
      // 6. Return a success response with the user data
      return { data: userWithoutPassword, message: 'Login successful.' };
  
    } catch (error) {
      console.error('Login function error:', error);
      return { data: null, message: 'An internal server error occurred.' };
    }
  }
  