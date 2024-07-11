import { ChooseWhichWayCanCreateAccount } from '@/components/auth/chooseWhichWayCanCreateAccount'
import { Logo } from '@/components/navbar/Logo'
import { getDictionary } from '@/lib/dictionary'
import { LanguagesProps } from '@/types/pages'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title : "Login"
}

const page = async ({params : {lang}} : LanguagesProps) => {
  const {page} = await getDictionary(lang)
  return (
    <div className=' grid place-content-center h-screen'>
       <div className=' flex justify-center mb-4'>
          <Logo title/>
       </div>
        <main className=' card bg-base-300 min-w-96 p-4'>
          <h2 className=' text-center text-2xl font-medium'>{page.auth.loginTitle}</h2>
          <ChooseWhichWayCanCreateAccount lang={lang} TPassword={page.auth.loginForm.password} TUsername={page.auth.loginForm.username}/>
        </main>
    </div>
  )
}

export default page