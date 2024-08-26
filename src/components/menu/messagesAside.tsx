import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Locale } from "@/i18n";
import MessagesAsideClient from "./messagesAsideClient";
import { MyImage } from "../style/myImage";
import { BsCheck2, BsChevronBarRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface props {
    children : React.ReactNode,
    lang : Locale
}

export const MessagesMenu = async ({
    children , lang
} : props) => {
  const user = (await auth())?.user;

  if (!user) return null;
  return (
    <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen h-screen rounded-lg w-full fixed z-40 items-start"
      > 
        <ResizablePanel className=" h-full max-sm:hidden md:flex" defaultSize={25} maxSize={35} minSize={8}>
          <MessagesAsideClient lang={lang}/>
        </ResizablePanel>
        <ResizableHandle withHandle className=" h-screen max-sm:hidden"/>
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className="max-h-screen overflow-y-auto pt-2">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}
