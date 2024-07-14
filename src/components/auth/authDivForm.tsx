import React from 'react'
import { Logo } from '../navbar/Logo';
import { cn } from '@/lib/utils';
import { Locale } from '@/i18n';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

interface Props {
    children: React.ReactNode;
    className?: string;
    title : string;   
    lang : Locale
}

export const AuthDivPage = async ({
    children , className , title, lang
} : Props) => {
  // const login = await auth();

  // if(!!login) {
  //   redirect(`/${lang}/s`)
  // }
  return (
    <div className={cn("grid place-content-center min-h-screen p-5" , className)}>
        <div className=' flex justify-center mb-4'>
            <Logo title/>
        </div>
        <main className=' card bg-base-300 shadow-lg min-w-96 p-4 min-h-60 h-auto max-w-xl'>
            <h2 className=' text-center text-2xl font-medium'>{title}</h2>
            {children}
       </main>
    </div>
  )
}
