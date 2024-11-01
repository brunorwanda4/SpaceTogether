"use client";

import { useContext, useEffect, useState } from "react";
import { BsCheck2Circle, BsPaletteFill } from "react-icons/bs";

import { ThemeContext } from "@/context/changeTheme";
import { useTheme } from "@/hooks/useTheme";
interface Props {
    title : string
}

export const AuthChangeTheme = ({title} : Props) => {
const {changeTheme} = useContext(ThemeContext)!;
const theme = useTheme()

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
        <div className=" mt-2 overflow-x-auto flex gap-2 w-full max-w-auto max-w-max max-sm:gap-1">
            {/* dark */}
           {themes.map((items) => {
            return (
                <div key={items} onClick={() => changeTheme(items)} data-theme={items} className="grid grid-cols-5 grid-rows-3 rounded-md max-w-32 cursor-pointer max-md:max-h-24"><div className="bg-base-200 col-start-1 row-span-2 row-start-1" /><div className="bg-base-300 bottom-0 col-start-1 row-start-3"/> <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2 relative"><div className="font-bold capitalize max-md:font-medium max-md:text-sm">{items}</div> <div className="flex flex-wrap gap-1"><div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-primary-content text-sm font-bold">A</div></div> <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-secondary-content text-sm font-bold">B</div></div> <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-accent-content text-sm font-bold max-sm:hidden">C</div></div> <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-neutral-content text-sm font-bold">{items === `${theme}` ? (<BsCheck2Circle size={20}/>) : "D"}</div></div></div> 
                </div></div>
            )
           })}
        </div>
    </div>
  )
}
