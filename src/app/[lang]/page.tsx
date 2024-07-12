import { LanguagesProps } from "@/types/pages";
import { getDictionary } from "@/lib/dictionary";
import { AuthNav } from "@/components/navbar/authNav";
import AuthDialog from "@/components/auth/authDialog";
import { auth, signOut } from "@/auth";

const Home = async ({params : {lang}} : LanguagesProps) =>{
  const { indexPage, page , nav } = await getDictionary(lang);
  const session = await auth();
  return (
    <div className="">
      name is : {session?.user?.name}
      <div>
        <AuthNav 
         lang={lang}
         TTLanguage={nav.auth.settingDialog.language}
         TSetting={nav.auth.settingDialog.setting}
         title={nav.auth.settingDialog.changeTheme}
         TSave={nav.auth.settingDialog.chooseLanguage.save}
         TCancel={nav.auth.settingDialog.chooseLanguage.cancel}
         chooseLang={nav.auth.settingDialog.chooseLanguage.changeLanguage}
        />
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
