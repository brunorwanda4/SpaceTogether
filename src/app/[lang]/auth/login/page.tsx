import { auth } from '@/auth'
import { AuthDivPage } from '@/components/auth/authDivForm'
import { ChooseWhichWayCanCreateAccount } from '@/components/auth/chooseWhichWayCanCreateAccount'
import { Logo } from '@/components/navbar/Logo'
import { Locale } from '@/i18n'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
export const metadata: Metadata = {
  title : "Login"
}

interface Props {
  params : {lang: Locale}
  children ?: React.ReactNode
}

const page = async ({params : {lang}} : Props) => {
  const {page} = await getDictionary(lang);
  return (
    <AuthDivPage lang={lang} title={page.auth.loginTitle}>
      <ChooseWhichWayCanCreateAccount 
           lang={lang} 
           TRegister={page.auth.loginForm.register} 
           TForget={page.auth.loginForm.forgetPassword} 
           TProvides={page.auth.loginForm.provides} 
           TLogin={page.auth.loginForm.login} 
           TPassword={page.auth.loginForm.password} 
           TUsername={page.auth.loginForm.username}
          />
    </AuthDivPage>
  )
}

export default page