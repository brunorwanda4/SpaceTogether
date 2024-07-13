import { ChooseWhichWayCanCreateAccount } from '@/components/auth/chooseWhichWayCanCreateAccount'
import { Logo } from '@/components/navbar/Logo'
import { Locale } from '@/i18n'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title : "Login"
}

interface Props {
  params : {lang: Locale}
  children ?: React.ReactNode
}

const page = async ({params : {lang}} : Props) => {
  const {page} = await getDictionary(lang)
  return (
    <div className=' grid place-content-center h-screen'>
       <div className=' flex justify-center mb-4'>
          <Logo title/>
       </div>
        <main className=' card bg-base-300 shadow-lg min-w-96 p-4 min-h-60 h-auto'>
          <h2 className=' text-center text-2xl font-medium'>{page.auth.loginTitle}</h2>
          <ChooseWhichWayCanCreateAccount 
           lang={lang} 
           TRegister={page.auth.loginForm.register} 
           TForget={page.auth.loginForm.forgetPassword} 
           TProvides={page.auth.loginForm.provides} 
           TLogin={page.auth.loginForm.login} 
           TPassword={page.auth.loginForm.password} 
           TUsername={page.auth.loginForm.username}
          />
        </main>
    </div>
  )
}

export default page