import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { SchoolAside } from "./schoolAside"
import { Locale } from "@/i18n"
import { getDictionary } from "@/lib/dictionary"

interface Props {
  children : React.ReactNode
  lang : Locale
}

export const SchoolMenu = async ({
  children,lang
} : Props) => {
  const {nav} = await getDictionary(lang)
    return(
        <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen rounded-lg w-full fixed z-40"
      >
        <ResizablePanel className=" h-full pt-12" defaultSize={15} maxSize={30} minSize={5}>
          <SchoolAside
           ShoolAsideProps={{
            TClub : nav.school.aside.clubs,
            TFamily : nav.school.aside.family,
            TGroup : nav.school.aside.group,
            THome : nav.school.aside.home,
            lang : lang
           }}
           lang={lang}
           TSetting={nav.auth.settingDialog.setting}
           TMessages={nav.school.aside.messages}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className=" w-full" defaultSize={75}>
          <main className=" pt-12 px-1 max-h-screen overflow-y-auto">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
}
