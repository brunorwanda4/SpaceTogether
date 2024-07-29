"use client";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { ISchool } from "@/types/school"
import { TUser } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsHandIndex, BsHandIndexFill, BsLayers, BsLayersFill, BsLightning, BsLightningFill, BsPeople, BsPeopleFill, BsTable, BsTabletFill } from "react-icons/bs";

interface props {
    school : ISchool;
    lang : Locale;
}

const ClassNavStudent = ({
    school , lang
} : props) => {
    const pathname = usePathname();
    const schoolPath = `/${lang}/s/${school.username}`
  return (
    <div className=" p-2 w-full flex gap-2">
      <Link className={cn("btn btn-sm btn-ghost" , pathname === `${schoolPath}` && " text-info")} href={`${schoolPath}`}>
        {pathname === `${schoolPath}` ? <BsLayersFill size={20} /> : <BsLayers size={20} />} 
        class
      </Link>

      <Link className={cn("btn btn-sm btn-ghost" , pathname === `${schoolPath}/ex` && " text-info")} href={`${schoolPath}/ex`}>
        {pathname === `${schoolPath}/ex` ? <BsLightningFill size={20} /> : <BsLightning size={20} />} 
        Exercises
      </Link>
      
      <Link className={cn("btn btn-sm btn-ghost" , pathname === `${schoolPath}/hw` && " text-info")} href={`${schoolPath}/hw`}>
        {pathname === `${schoolPath}/hw` ? <BsHandIndexFill size={20} /> : <BsHandIndex size={20} />} 
        Homeworks
      </Link>
      
      <Link className={cn("btn btn-sm btn-ghost" , pathname === `${schoolPath}/stu` && " text-info")} href={`${schoolPath}/stu`}>
        {pathname === `${schoolPath}/stu` ? <BsPeopleFill size={20} /> : <BsPeople size={20} />} 
        Students
      </Link>
      
      <Link className={cn("btn btn-sm btn-ghost" , pathname === `${schoolPath}/tea` && " text-info")} href={`${schoolPath}/tea`}>
        {pathname === `${schoolPath}/tea` ? <BsPeopleFill size={20} /> : <BsPeople size={20} />} 
        Teachers
      </Link>
      <Link className={cn("btn btn-sm btn-ghost" , pathname === `${schoolPath}/time` && " text-info")} href={`${schoolPath}/time`}>
        {pathname === `${schoolPath}/time` ? <BsTable size={20} /> : <BsTable size={20} />} 
        Time table
      </Link>
    </div>
  )
}

export default ClassNavStudent
