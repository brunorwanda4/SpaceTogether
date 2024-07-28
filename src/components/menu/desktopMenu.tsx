import DesktopNav from "../navbar/DesktopNav"
import { DesktopLogo,} from "../navbar/Logo"
import { Locale } from "@/i18n"
import DesktopWindows from "../navbar/DesktopWindows"
import {appWindow} from "@tauri-apps/api/window";

interface props{
    lang : Locale
}

const DesktopMenu = ({lang} : props) => {
  return (
    <header data-tauri-drag-region className=" flex justify-between  items-center px-2 backdrop-blur-lg h-12 fixed z-50 w-full border-b border-neutral-content">
      <DesktopLogo/>
      <div className=" gap-4 flex">
        <DesktopNav lang={lang}/>
        {/* <DesktopWindows /> */}
      </div>
    </header>
  )
}

export default DesktopMenu
