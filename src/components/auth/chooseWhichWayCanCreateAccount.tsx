"use client";

import Link from 'next/link';

import UseOnlineStatus from '@/hooks/useOnlineStatus';
import { Locale } from '@/i18n';

import LoginForm from './form/LoginForm';
import AuthProvides from './authProvides';
import { AuthSeverDiv } from './authSeverDiv';
import { ChoosePropsAuth } from './authDialog';

interface Props {
  TPassword: string;
  TUsername: string;
  lang :Locale,
  TLogin :string,
  TProvides : string,
  TForget : string,
  TRegister : string,
  choose ?: (choice : ChoosePropsAuth) => void
}

export const ChooseWhichWayCanCreateAccount = ({
    TPassword , TRegister ,TForget,choose, TProvides ,TLogin, TUsername , lang
  } : Props) => {
   const online = UseOnlineStatus();
  return (
    <div>
      <div className=''>
        <LoginForm choose={choose} TForget={TForget} lang={lang} TLogin={TLogin} TPassword={TPassword} TUsername={TUsername}/>
        </div>
    </div>
  )
}
