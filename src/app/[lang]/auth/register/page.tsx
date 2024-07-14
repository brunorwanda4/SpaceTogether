import { auth } from '@/auth';
import { ChooseHowToCreateAccount } from '@/components/auth/chooseHowToCreateAccount';
import { Logo } from '@/components/navbar/Logo'
import { getDictionary } from '@/lib/dictionary'
import { LangPageProps, LanguagesProps } from '@/types/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata:Metadata = {
  title : "Create Account",
}

const page = async ({ params : {lang} } : LanguagesProps) => {
 const {page} = await getDictionary(lang);

  const login = await auth();

  if(!!login) {
    redirect(`/${lang}/s`)
  }
  return (
    <div className=' grid place-content-center min-h-screen p-5'>
    <div className=' flex justify-center mb-4'>
       <Logo title/>
    </div>
     <main className=' card bg-base-300 shadow-lg min-w-96 p-4 min-h-60 h-auto max-w-xl'>
       <h2 className=' text-center text-2xl font-medium'>{page.auth.register.registerTitle}</h2>
       <ChooseHowToCreateAccount 
         lang={lang} 
         TRegister={page.auth.register.login} 
         TForget={page.auth.loginForm.forgetPassword} 
         TProvides={page.auth.loginForm.provides} 
         TLogin={page.auth.loginForm.login} 
         TPassword={page.auth.loginForm.password} 
         TUsername={page.auth.loginForm.username} 
         registerProp={{
          TPassword: page.auth.loginForm.password,
          lang: lang,
          TLogin: page.auth.loginForm.login,
          TLName: page.auth.register.LName,
          TFName: page.auth.register.FName,
          TDay: page.auth.register.day,
          TMonth: page.auth.register.month,
          TYear: page.auth.register.year,
          TGender: page.auth.register.Gender,
          TMale: page.auth.register.Male,
          TFmale: page.auth.register.Female,
          TOther: page.auth.register.Other,
          TEmail : page.auth.register.email,
          TCreate : page.auth.register.createAccount
        }}
         />
     </main>
 </div>
  )
}

export default page
