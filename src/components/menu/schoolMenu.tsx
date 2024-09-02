import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { SchoolAside } from "./schoolAside"
import { Locale } from "@/i18n"
import { getDictionary } from "@/lib/dictionary"
import { auth } from "@/auth"
import { FindSchoolByOwn } from "@/data/getSchool"
import { ISchool, TSchoolWithUser } from "@/types/school"
import { getUserById } from "@/data/getUserData"

interface Props {
  children : React.ReactNode
  lang : Locale
}

export const SchoolMenu = async ({
  children,lang ,
} : Props) => {
  const {nav} = await getDictionary(lang);
  const user = (await auth())?.user;

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
  
    return(
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen h-screen rounded-lg w-full fixed z-40 items-start"
      > 
        <ResizablePanel 
         className=" h-full max-md:hidden" 
         defaultSize={15} 
         maxSize={30} 
         minSize={5}>
          <SchoolAside
           ShoolAsideProps={{
            TClub : nav.school.aside.clubs,
            TFamily : nav.school.aside.family,
            TGroup : nav.school.aside.group,
            THome : nav.school.aside.home,
            lang : lang,
           }}
           lang={lang}
           TSetting={nav.auth.settingDialog.setting}
           TMessages={nav.school.aside.messages}
           TId={user?.id}
           Schools={schoolsWithUser}
          />
        </ResizablePanel>
        <ResizableHandle className=" h-screen max-sm:hidden"/>
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className="px-1 max-h-screen overflow-y-auto pt-2">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
}
