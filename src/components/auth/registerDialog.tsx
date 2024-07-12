import { Locale } from '@/i18n';
import React from 'react'
import { RegisterProps } from './form/RegisterForm';
import { ChooseHowToCreateAccount } from './chooseHowToCreateAccount';
import { ChoosePropsAuth } from './authDialog';

interface Props {
    TPassword: string;
    TUsername: string;
    lang :Locale,
    TLogin :string,
    TProvides : string,
    TForget : string,
    TRegister : string,
    TTRegister : string,
    registerProp : RegisterProps,
    choose : (choice : ChoosePropsAuth) => void
  }
  

export const RegisterDialog = ({
    TPassword , TRegister , choose, registerProp, TProvides ,TLogin, TUsername , lang,TTRegister,TForget,
} : Props) => {
  return (
    <main className='min-w-96 min-h-60 h-auto'>
       <h2 className=' text-center text-2xl font-medium'>{TTRegister}</h2>
       <ChooseHowToCreateAccount
         lang={lang} 
         TRegister={TRegister} 
         TForget={TForget} 
         TProvides={TProvides} 
         TLogin={TLogin} 
         TPassword={TPassword} 
         TUsername={TUsername} 
         registerProp={registerProp}
         choose={choose}
         />
     </main>
  )
}
