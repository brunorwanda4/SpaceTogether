"use client";

import { BsX } from "react-icons/bs";
import { VscChromeMinimize } from "react-icons/vsc";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";

import { appWindow } from '@tauri-apps/api/window'

const DesktopWindows = () => {
  return (
    <div className=" flex gap-2">
      <button onClick={() => appWindow.minimize()} className=" btn btn-square btn-sm btn-ghost  h-10 w-10">
        <VscChromeMinimize size={24}/>
      </button>
      <button onClick={() => appWindow.toggleMaximize()} className=" btn btn-square btn-sm btn-ghost h-10 w-10">
        <RiCheckboxMultipleBlankLine size={20}/>
      </button>
      <button onClick={() => appWindow.close()} className=" btn btn-square btn-sm hover:btn-error bg-transparent duration-200 border-none h-10 w-10">
        <BsX size={24}/>
      </button>
    </div>
  )
}

export default DesktopWindows
