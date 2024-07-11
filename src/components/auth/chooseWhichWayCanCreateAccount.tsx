"use client";

import UseOnlineStatus from '@/hooks/useOnlineStatus';
import React from 'react'
import { BsGithub } from 'react-icons/bs';
import LoginForm from './form/LoginForm';
import { Locale } from '@/i18n';

interface Props {
  TPassword: string;
  TUsername: string;
  lang :Locale
}

export const ChooseWhichWayCanCreateAccount = ({TPassword , TUsername , lang} : Props) => {
   const online = UseOnlineStatus();
  return (
    <div>
      <div className=' h-full'>
        <LoginForm lang={lang} TPassword={TPassword} TUsername={TUsername}/>
      </div>
      {online && (
        <div>
          <h4>Continuer with</h4>
          <div>
            <BsGithub size={24} />
          </div>
      </div> 
      )}
    </div>
  )
}
