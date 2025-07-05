import LoginForm from '@/components/user-login-form';
import prisma from '@/lib/db';
import React from 'react'

const Page = async() => {
  const allUsers = await prisma.user.findMany()
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <LoginForm />
        {allUsers.map((u,i)=>{
          return (
            <>
            <>{u.email}</>
            <>{u.password}</>
            </>
          )
        })}
      </div>
    );
  };
  
  export default Page;