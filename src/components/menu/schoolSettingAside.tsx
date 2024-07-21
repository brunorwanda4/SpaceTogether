"use client";

import { Locale } from "@/i18n"
import { FaSchool } from "react-icons/fa6"
import Link from "next/link"
import { ISchool } from "@/types/school"
import { usePathname } from "next/navigation"
import { BsCheck2Circle } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { AsideLinkClassName } from "../style";
import { SPLine } from "../style/simpleComponents/line";

interface props {
    lang : Locale
    school : ISchool | null
}
export const SchoolSettingAside = ({
    lang ,school
} : props) => {
    const pathname = usePathname();
    if(!school) return null;
  return (
    <div className=" w-full">
        <div className=" flex flex-col px-1">
            <Link className={cn(AsideLinkClassName , " justify-between w-full")} href={`/${lang}/s/${school.username}/se`}>
                <div className=" flex gap-2 items-center">
                    <FaSchool size={20} className=" text-gray-500"/>
                    <span>School</span>
                </div>
                {pathname === `/${lang}/s/${school.username}/se` && (<BsCheck2Circle />)}
            </Link>
        </div>
        <SPLine className=" my-0"/>
        
    </div>
  )
}
