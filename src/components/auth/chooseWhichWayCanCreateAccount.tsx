"use client";

import UseOnlineStatus from '@/hooks/useOnlineStatus';
import React from 'react'
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import LoginForm from './form/LoginForm';
import { Locale } from '@/i18n';
import { SPLine } from '../style/simpleComponents/line';
import Link from 'next/link';

interface Props {
  TPassword: string;
  TUsername: string;
  lang :Locale,
  TLogin :string,
  TProvides : string,
  TForget : string,
  TRegister : string,
}

export const ChooseWhichWayCanCreateAccount = ({TPassword , TRegister ,TForget, TProvides ,TLogin, TUsername , lang} : Props) => {
   const online = UseOnlineStatus();
  return (
    <div>
      <div className=''>
        <LoginForm TForget={TForget} lang={lang} TLogin={TLogin} TPassword={TPassword} TUsername={TUsername}/>
       {!!online &&  (<Link className=' mt-2 text-sm text-neutral-content' href={`/${lang}/auth/register`}>{TRegister}</Link>)}
      </div>
      {!!online && (
        <div className=' mt-2'>
          <div className=' flex gap-2'>
            <SPLine />
            <h4 className=' text-xs'>{TProvides}</h4>
            <SPLine />
          </div>
          <div className=' flex justify-center gap-2 mt-2'>
            <button className=' btn btn-circle btn-neutral'>
              <BsGithub size={24} />
            </button>
            <button className=' btn btn-circle btn-neutral'>
              <BsGoogle size={24} />
            </button>
            <button className=' btn btn-circle btn-neutral'>
              <BsFacebook size={24} />
            </button>
          </div>
      </div> 
      )}
    </div>
  )
}
