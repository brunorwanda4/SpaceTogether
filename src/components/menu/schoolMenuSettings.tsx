import { Locale } from "@/i18n"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { SchoolSettingAside } from "./schoolSettingAside";
import SchoolSettingsSearch from "./SchoolSettingsSearch";
import { ISchool } from "@/types/school";
import { MyImage } from "../style/myImage";
import { SPLine } from "../style/simpleComponents/line";
import SchoolNotFount from "../error/schoolNotFount";
import { SchoolNav } from "../navbar/schoolNav";

interface props {
    lang : Locale;
    children : React.ReactNode
    school : ISchool | null;
    username : string;
}
export const SchoolMenuSettings = ({
    lang , children , school , username
} : props) => {
  if(!school) return (
    <SchoolNotFount lang={lang} schoolUsername={username}/>
  );
  return (
    <ResizablePanelGroup
    direction="horizontal"
    className="min-h-screen h-full rounded-lg w-full fixed z-40 items-start"
  >
    <ResizablePanel className=" h-screen w-full flex-col flex gap-2 overflow-y-auto max-h-screen" defaultSize={20} maxSize={30} minSize={5}>
      <div className=" flex gap-1 px-1 mt-2">
         <SchoolNav school={school} lang={lang}/>
        <h2 className=" font-semibold  text-xl lg:text-2xl">Settings</h2>
      </div>
     <SchoolSettingsSearch />
     <SPLine className=" mt-0"/>
     <SchoolSettingAside school={school} lang={lang}/>
    </ResizablePanel>
    <ResizableHandle className=" h-screen"/>
    <ResizablePanel className=" w-full" defaultSize={75}>
      <main className="px-1 max-h-screen overflow-y-auto p-2">
        {children}
      </main>
    </ResizablePanel>
  </ResizablePanelGroup>
  )
}
