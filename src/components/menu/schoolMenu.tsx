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
import { ISchool } from "@/types/school"
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

    // @ts-ignore
    const schoolsWithUser: TSchoolWithUser[] = await Promise.all(findSchool.map(async (schoolDoc) => {
      const school = schoolDoc.toObject() as ISchool; // Convert to plain object
      const createdBy = await getUserById(school.createdBy.toString());
      return { ...school, createdBy };
    }));

    return(
        <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen h-full rounded-lg w-full fixed z-40"
      >
        <ResizablePanel className=" h-full pt-12" defaultSize={15} maxSize={30} minSize={5}>
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
        <ResizableHandle  />
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className=" pt-14 px-1 max-h-screen overflow-y-auto">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
}
