import { Locale } from "@/i18n"
import {ResizableHandle,ResizablePanel,ResizablePanelGroup,} from "@/components/ui/resizable"
import { ISchool } from "@/types/school"
import SchoolUsernameAside from "./SchoolUsernameAside"
import SchoolNotFount from "../error/schoolNotFount"
import { SchoolNav } from "../navbar/schoolNav"
import ClassNavStudent from "../navbar/ClassNavStudent"
import { TUser } from "@/types/user"
import Link from "next/link"

interface props {
    children: React.ReactNode
    lang : Locale
    schoolUsername : string
    school : ISchool | null
}

export const SchoolMenuUsername = ({
    children , lang , school , schoolUsername
} : props) => {
  if(!school) return <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>
  return (
    <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen h-full rounded-lg w-full fixed z-40 items-start"
      >
        <ResizablePanel className=" h-full max-sm:hidden" defaultSize={20} maxSize={30} minSize={5}>
         <div className=" p-2">
            <SchoolNav title school={school} schoolUsername={schoolUsername} lang={lang}/>
            <SchoolUsernameAside username={schoolUsername} lang={lang} school={school} />
         </div>
         <div className="h-screen">
          <Link href={`/s/${schoolUsername}/se`}>Settings</Link>
         </div>
         <div className="h-screen">
          screen hight
         </div>
         <div className="h-screen">
          screen hight
         </div>
        </ResizablePanel>
        <ResizableHandle withHandle className=" h-screen"/>
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className="px-1 max-h-screen overflow-y-auto">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}
