"use client";

import { Locale } from "@/i18n"
import { FaSchool } from "react-icons/fa6"
import Link from "next/link"
import { ISchool } from "@/types/school"
import { usePathname } from "next/navigation"
import { BsCheck2Circle, BsHouse, BsLayers, BsLayersFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { AsideLinkClassName } from "../style";
import { SPLine } from "../style/simpleComponents/line";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";

interface props {
    lang : Locale
    school : ISchool | null
}
export const SchoolSettingAside = ({
    lang ,school
} : props) => {
    const pathname = usePathname();
    if(!school) return null;
    const schoolPathnameSettings = `/${lang}/s/${school.username}/se`
  return (
    <div className=" w-full">
        <div className=" line px-1">
            <Link className={cn(AsideLinkClassName , " justify-between w-full")} href={`${schoolPathnameSettings}`}>
                <div className=" flex gap-2 items-center">
                    <FaSchool size={20} className=" text-gray-500"/>
                    <span>About school</span>
                </div>
                {pathname === `${schoolPathnameSettings}` && (<BsCheck2Circle />)}
            </Link>
            <Link className={cn(AsideLinkClassName , " justify-between w-full")} href={`${schoolPathnameSettings}/cl`}>
                <div className=" flex gap-2 items-center">
                    {pathname === `${schoolPathnameSettings}/cl` ? <BsLayersFill size={20} className=" text-gray-500"/> : <BsLayers size={20} className=" text-gray-500"/>}
                    <span>Classes</span>
                </div>
                {pathname === `${schoolPathnameSettings}/cl` && (<BsCheck2Circle />)}
            </Link>
            <Link className={cn(AsideLinkClassName , " justify-between w-full")} href={`${schoolPathnameSettings}/tea`}>
                <div className=" flex gap-2 items-center">
                    {pathname === `${schoolPathnameSettings}/tea` ? <FaChalkboardTeacher size={20} className=" text-gray-500"/> : <FaChalkboardTeacher size={20} className=" text-gray-500"/>}
                    <span>Teachers</span>
                </div>
                {pathname === `${schoolPathnameSettings}/tea` && (<BsCheck2Circle />)}
            </Link>
            <Link className={cn(AsideLinkClassName , " justify-between w-full")} href={`${schoolPathnameSettings}/stu`}>
                <div className=" flex gap-2 items-center">
                    {pathname === `${schoolPathnameSettings}/stu` ? <PiStudentDuotone size={20} className=" text-gray-500"/> : <PiStudentDuotone size={20} className=" text-gray-500"/>}
                    <span>Students</span>
                </div>
                {pathname === `${schoolPathnameSettings}/stu` && (<BsCheck2Circle />)}
            </Link>
            <Link className={cn(AsideLinkClassName , " justify-between w-full")} href={`${schoolPathnameSettings}/st`}>
                <div className=" flex gap-2 items-center">
                    {pathname === `${schoolPathnameSettings}/st` ? <FaPeopleGroup size={20} className=" text-gray-500"/> : <FaPeopleGroup size={20} className=" text-gray-500"/>}
                    <span>Staffs</span>
                </div>
                {pathname === `${schoolPathnameSettings}/st` && (<BsCheck2Circle />)}
            </Link>
        </div>
        <SPLine className=" my-0"/>
        
    </div>
  )
}
