import { ChooseTheme } from "@/components/theme/chooseTheme";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl"
import { LanguagesProps } from "@/types/pages";
import { getDictionary } from "@/lib/dictionary";
import { AuthNav } from "@/components/navbar/authNav";
import AuthDialog from "@/components/auth/authDialog";

const Home = async ({params : {lang}} : LanguagesProps) =>{
  const { indexPage, page } = await getDictionary(lang);
  return (
    <div className="">
      <div>
        <AuthNav lang={lang}/>
      </div>
      <div className=" grid place-content-center h-screen">
        <div>
          <AuthDialog 
           indexWord={indexPage.getStart}
           lang={lang}
           TRegister={page.auth.loginForm.register}
           TForget={page.auth.loginForm.forgetPassword}
           TProvides={page.auth.loginForm.provides}
           TLogin={page.auth.loginForm.login}
           TPassword={page.auth.loginForm.password}
           TUsername={page.auth.loginForm.username}
           TTitleLogin={page.auth.loginTitle}
           TTRegister={page.auth.register.registerTitle}
           registerProp={{
            TPassword: page.auth.loginForm.password,
            lang: lang,
            TLogin: page.auth.loginForm.login,
            TLName: page.auth.register.LName,
            TFName: page.auth.register.FName,
            TDay: page.auth.register.day,
            TMonth: page.auth.register.month,
            TYear: page.auth.register.year,
            TGender: page.auth.register.Gender,
            TMale: page.auth.register.Male,
            TFmale: page.auth.register.Female,
            TOther: page.auth.register.Other,
            TEmail : page.auth.register.email
          }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
