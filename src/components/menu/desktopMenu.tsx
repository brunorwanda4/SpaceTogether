import DesktopNav from "../navbar/DesktopNav"
import { DesktopLogo,} from "../navbar/Logo"
import { Locale } from "@/i18n"
import DesktopWindows from "../navbar/DesktopWindows"
import {appWindow} from "@tauri-apps/api/window";
import { auth } from "@/auth";
import { Menu } from "lucide-react";
import { MobileAsideSchool } from "./mobileAsideSchool";
import { ISchool, TSchoolWithUser } from "@/types/school";
import { FindSchoolByOwn } from "@/data/getSchool";
import { getUserById } from "@/data/getUserData";
import { getDictionary } from "@/lib/dictionary";

interface props{
    lang : Locale
}

const DesktopMenu = async ({lang} : props) => {
  const user = (await auth())?.user;
  const {nav} = await getDictionary(lang);


  const findSchool: ISchool[] | null = await FindSchoolByOwn(user?.id)

    let schoolsWithUser : TSchoolWithUser[] | undefined
  if(!!findSchool) {
        // @ts-ignore
        schoolsWithUser = await Promise.all(findSchool.map(async (schoolDoc) => {
          const school = schoolDoc.toObject() as ISchool; // Convert to plain object
          const createdBy = await getUserById(school.createdBy.toString());
          return { ...school, createdBy };
        }));
  }

  if (!user) return null;
  return (
    <header data-tauri-drag-region className=" flex justify-between  items-center px-2 backdrop-blur-lg h-12 fixed z-50 w-full border-b border-neutral-content">
      <div className=" flex gap-2">
        <MobileAsideSchool 
         ShoolAsideProps={{
          TClub : nav.school.aside.clubs,
          TFamily : nav.school.aside.family,
          TGroup : nav.school.aside.group,
          THome : nav.school.aside.home,
          lang : lang,
         }}
         lang={lang}
         SchoolAsideProps={{
          lang : lang,
          ShoolAsideProps : {
            TClub : nav.school.aside.clubs,
            TFamily : nav.school.aside.family,
            TGroup : nav.school.aside.group,
            THome : nav.school.aside.home,
            lang : lang,
          },
          Schools : schoolsWithUser,
          TSetting : nav.auth.settingDialog.setting,
          TMessages : nav.school.aside.messages,
          TId : user?.id,
         }}
        />
        <DesktopLogo/>
      </div> 
      <div className=" gap-4 flex">
        <DesktopNav lang={lang}/>
        {/* <DesktopWindows /> */}
      </div>
    </header>
  )
}

export default DesktopMenu
