"use client";

import Link from 'next/link';

import UseOnlineStatus from '@/hooks/useOnlineStatus';
import { Locale } from '@/i18n';

import AuthProvides from './authProvides';
import { AuthSeverDiv } from './authSeverDiv';
import RegisterForm, { RegisterProps } from './form/RegisterForm';
import { ChoosePropsAuth } from './authDialog';

interface Props {
  TPassword: string;
  TUsername: string;
  lang :Locale,
  TLogin :string,
  TProvides : string,
  TForget : string,
  TRegister : string,
  registerProp : RegisterProps
  choose ?: (choice : ChoosePropsAuth) => void
}

export const ChooseHowToCreateAccount = ({
    TPassword , TRegister ,registerProp, TProvides ,TLogin, TUsername , lang,choose
  } : Props) => {
    const online = UseOnlineStatus();
  return (
    <div className=''>
      <RegisterForm 
        TCPassword={registerProp.TCPassword}
        TFName={registerProp.TFName} 
        TEmail={registerProp.TEmail} 
        TLName={registerProp.TLName} 
        TDay={registerProp.TDay} 
        TFmale={registerProp.TFmale} 
        TGender={registerProp.TGender} 
        TMale={registerProp.TMale} 
        TMonth={registerProp.TMonth} 
        TOther={registerProp.TOther} 
        TYear={registerProp.TYear} 
        TCreate={registerProp.TCreate}
        lang={lang} 
        TLogin={TLogin} 
        TPassword={TPassword}
      />
      {/* {!!online &&(<> */}
        {choose && (
        <button onClick={() => choose("login")} className=' mt-2 text-sm text-neutral-content btn btn-sm btn-link'>{TLogin}</button>
        )}
        {/* </>)} */}
    </div>
  )
}

