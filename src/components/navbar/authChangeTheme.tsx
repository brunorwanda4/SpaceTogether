"use client";

import { useContext, useEffect, useState } from "react";
import { BsPaletteFill } from "react-icons/bs";
import { MdDarkMode, MdLightMode, MdSettingsBrightness } from 'react-icons/md';

import { ThemeContext } from "@/context/changeTheme";
import { cn } from "@/lib/utils";
interface Props {
    title : string
}

export const AuthChangeTheme = ({title} : Props) => {
const {changeTheme} = useContext(ThemeContext)!;
const [selectedTheme, setSelectedTheme] = useState<string>('system'); 

const themes   = ["light","pastel" , "forest", "dark", "night",]


  return (
    <div>
       <div className=" flex justify-between">
            <div className=" flex gap-2 items-center">
                <BsPaletteFill size={20} className="text-neutral"/>
                <h3>
                    {title}
                </h3>
            </div>
       </div>
        {/* choose theme */}
        <div className=" mt-2 overflow-x-auto flex gap-2 w-full max-w-auto max-w-max">
            {/* dark */}
           {themes.map((items) => {
            return (
                <div key={items} onClick={() => changeTheme(items)} data-theme={items} className=" bg-base-100 size-[88px] rounded-lg p-2 shadow-2xl flex flex-col gap-2 cursor-pointer">
                <span className="  text-center capitalize text-sm">{items}</span> 
                    <div className=" justify-end flex"><div className=" h-2 w-1/2 bg-base-300 rounded-sm skeleton"/></div>
                    <div className=" justify-start flex"><div className=" h-2 w-1/2 bg-base-300 rounded-sm  skeleton"/></div>
                    <div className=" justify-end flex"><div className=" h-2 w-1/2 bg-base-300 rounded-sm  skeleton"/></div>
                </div>
            )
           })}
        </div>
    </div>
  )
}
