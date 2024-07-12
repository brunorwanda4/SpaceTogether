"use client";

import Link from 'next/link';

import UseOnlineStatus from '@/hooks/useOnlineStatus';
import { Locale } from '@/i18n';

import { SPLine } from '../style/simpleComponents/line';
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
  choose : (choice : ChoosePropsAuth) => void
}

export const ChooseHowToCreateAccount = ({
    TPassword , TRegister ,registerProp, TProvides ,TLogin, TUsername , lang,choose
  } : Props) => {
    const online = UseOnlineStatus();
  return (
    <div>
      <div className=''>
        <RegisterForm 
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
         lang={lang} 
         TLogin={TLogin} 
         TPassword={TPassword} 
        />
       <button onClick={() => choose("login")} className=' mt-2 text-sm text-neutral link-hover'>{TLogin}</button>
      </div>
      {!!online && (
        <div className=' mt-2'>
          <AuthSeverDiv >
            <AuthProvides TProvides={TProvides}/>
          </AuthSeverDiv>
      </div> 
      )}
    </div>
  )
}

