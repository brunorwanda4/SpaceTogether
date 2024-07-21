import { Locale } from "@/i18n"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ISchool } from "@/types/school"
import SchoolUsernameAside from "./SchoolUsernameAside"
import SchoolNotFount from "../error/schoolNotFount"

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
        className="min-h-screen h-full rounded-lg w-full fixed z-40 items-start pt-12"
      >
        <ResizablePanel className=" h-full" defaultSize={20} maxSize={30} minSize={5}>
          <SchoolUsernameAside lang={lang} school={school} />
        </ResizablePanel>
        <ResizableHandle className=" h-screen"/>
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className="px-1 max-h-screen overflow-y-auto pt-1 p-2">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}
