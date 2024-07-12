// src/app/[lang]/auth/login/page.tsx

import { ChooseWhichWayCanCreateAccount } from '@/components/auth/chooseWhichWayCanCreateAccount'
import { Locale } from '@/i18n';
import { getDictionary } from '@/lib/dictionary'
import React, { useState } from 'react'
import { ChoosePropsAuth } from './authDialog';


interface Props {
    TPassword: string;
    TUsername: string;
    lang :Locale,
    TLogin :string,
    TProvides : string,
    TForget : string,
    TRegister : string,
    TTitleLogin : string,
    choose : (choice : ChoosePropsAuth) => void
  }


export const LoginDialog = ({ 
    TForget, TUsername, TProvides,choose, TRegister, TLogin,TTitleLogin,lang,TPassword
 } : Props) => {
  return (
    <main className='card min-w-96 min-h-60 h-auto'>
      <h2 className='text-center text-2xl font-medium'>{TTitleLogin}</h2>
      <ChooseWhichWayCanCreateAccount
        choose={choose}
        lang={lang}
        TRegister={TRegister}
        TForget={TForget}
        TProvides={TProvides}
        TLogin={TLogin}
        TPassword={TPassword}
        TUsername={TUsername}
      />
    </main>
  )
}
