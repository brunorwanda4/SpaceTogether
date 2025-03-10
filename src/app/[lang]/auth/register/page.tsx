import { auth } from '@/auth';
import { AuthDivPage } from '@/components/auth/authDivForm';
import { ChooseHowToCreateAccount } from '@/components/auth/chooseHowToCreateAccount';
import { Logo } from '@/components/navbar/Logo'
import { MyImage } from '@/components/style/myImage';
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

  const user = (await auth())?.user;

  if(!!user) {
    redirect(`/${lang}/s`)
  };
  return (
    <AuthDivPage className=' h-full' lang={lang} title={page.auth.register.registerTitle}>
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
          TCPassword : page.auth.register.CPassword,
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
    </AuthDivPage>
  )
}

export default page
