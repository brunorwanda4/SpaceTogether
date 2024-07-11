"use client";

import Link from 'next/link';

import UseOnlineStatus from '@/hooks/useOnlineStatus';
import { Locale } from '@/i18n';

import LoginForm from './form/LoginForm';
import { SPLine } from '../style/simpleComponents/line';
import AuthProvides from './authProvides';
import { AuthSeverDiv } from './authSeverDiv';

interface Props {
  TPassword: string;
  TUsername: string;
  lang :Locale,
  TLogin :string,
  TProvides : string,
  TForget : string,
  TRegister : string,
}

export const ChooseWhichWayCanCreateAccount = ({
    TPassword , TRegister ,TForget, TProvides ,TLogin, TUsername , lang
  } : Props) => {
   const online = UseOnlineStatus();
  return (
    <div>
      <div className=''>
        <LoginForm TForget={TForget} lang={lang} TLogin={TLogin} TPassword={TPassword} TUsername={TUsername}/>
       {!!online &&  (<Link className=' mt-2 text-sm text-neutral-content link-hover' href={`/${lang}/auth/register`}>{TRegister}</Link>)}
      </div>
      {!!online && (
        <div className=' mt-2'>
          <AuthSeverDiv>
            <AuthProvides TProvides={TProvides}/>
          </AuthSeverDiv>
      </div> 
      )}
    </div>
  )
}
