"use client";

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Locale } from '@/i18n';
import { LoginDialog } from './loginDialog';
import { RegisterDialog } from './registerDialog';
import { RegisterProps } from './form/RegisterForm';
import { useTheme } from '@/hooks/useTheme';
import { signIn } from '@/auth';
import { logout } from '@/server/logout';
import { useRouter } from 'next/navigation';
import { isLogin } from '@/server/isLogin';

interface Props {
    indexWord : string
    TPassword: string;
    TUsername: string;
    lang :Locale,
    TLogin :string,
    TProvides : string,
    TForget : string,
    TRegister : string,
    TTitleLogin : string,
    // register
    registerProp : RegisterProps
    TTRegister : string,
}

export type ChoosePropsAuth = "login" | "register" | "forget"

const AuthDialog = ({
    TForget, TUsername, TProvides, registerProp,TTRegister, TRegister, TLogin,TTitleLogin,lang,TPassword,indexWord
} : Props) => {
  // choose which type you can login
   const [choose, setChoose] = useState<ChoosePropsAuth>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('choose') as ChoosePropsAuth) || "login";
  });

  // change the URL of type you what to search
  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      params.set('choose', choose);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [choose]);

  // click effect for change how to login
  const handleButtonClick = (choice: ChoosePropsAuth) => {
    setChoose(choice);
  };

  // router

  const router = useRouter();

  // if user is login
  const user = !!isLogin();

  const renderContent = () => {
    switch (choose) {
        case "login":
            return (
              <LoginDialog
              lang={lang}
              TRegister={TRegister}
              TForget={TForget}
              TProvides={TProvides}
              TLogin={TLogin}
              TPassword={TPassword}
              TUsername={TUsername}
              TTitleLogin={TTitleLogin}
              choose={handleButtonClick}
              />
            );
        case "register":
            return (
              <RegisterDialog
              lang={lang} 
              TRegister={TRegister} 
              TForget={TForget} 
              TProvides={TProvides} 
              TLogin={TLogin} 
              TPassword={TPassword} 
              TUsername={TUsername} 
              registerProp={registerProp}
              TTRegister={TTRegister}
              choose={handleButtonClick}
              />
            );
        case "forget":
            return <p>Currently in Forget state</p>;
        default:
            return (
            <LoginDialog
              lang={lang}
              TRegister={TRegister}
              TForget={TForget}
              TProvides={TProvides}
              TLogin={TLogin}
              TPassword={TPassword}
              TUsername={TUsername}
              TTitleLogin={TTitleLogin}
              choose={handleButtonClick}
          />);
    }
}

// theme use is using 
const theme = useTheme();
  return (
    <Dialog>
      <DialogTrigger>
        <div className=" btn">
             {indexWord}
          </div>
      </DialogTrigger>
      <DialogContent data-theme={theme} className=' max-w-fit  bg-base-300 card '>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
