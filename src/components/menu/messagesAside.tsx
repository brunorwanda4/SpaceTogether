import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Locale } from "@/i18n";
import MessagesAsideClient from "./messagesAsideClient";

interface props {
    children : React.ReactNode,
    lang : Locale
}

export const MessagesMenu = ({
    children , lang
} : props) => {
  return (
    <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen h-screen rounded-lg w-full fixed z-40 items-start"
      > 
        <ResizablePanel className=" h-full max-sm:hidden md:flex" defaultSize={20} maxSize={35} minSize={8}>
          <MessagesAsideClient lang={lang}/>
        </ResizablePanel>
        <ResizableHandle withHandle className=" h-screen max-sm:hidden"/>
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className="px-1 max-h-screen overflow-y-auto pt-2">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}

interface MessagesAsideProps {
    lang : Locale
}

