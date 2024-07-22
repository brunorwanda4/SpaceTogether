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
        <LoginForm TForget={TForget} lang={lang} TLogin={TLogin} TPassword={TPassword} TUsername={TUsername}/>
        {!!online &&(<>
         {choose ? (
          <button onClick={() => choose("register")} className=' mt-2 text-sm text-neutral link-hover'>{TRegister}</button>
         ) : (
          <Link href={`/${lang}/auth/register`} className=' mt-2 text-sm text-neutral link-hover'>{TRegister}</Link>
         )}
         </>)}
      </div>
      {!!online && (
        <div className=' mt-2'>
          <AuthSeverDiv>
            <AuthProvides lang={lang} TProvides={TProvides}/>
          </AuthSeverDiv>
      </div> 
      )}
    </div>
  )
}
