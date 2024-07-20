"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsMessenger } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { AsideLinkClassName } from "../style";
import { usePathname } from "next/navigation";

interface Props {
    lang : string;
    TSetting : string;
    TMessages : string;
}

export const SchoolAsideMain = ({
    lang,TSetting ,TMessages
} : Props) => {
    const pathname = usePathname()
  return (
    <div className='flex flex-col gap-1 w-full justify-start px-1 py-1 '>
        <Link className={cn(AsideLinkClassName)} href={`/${lang}/m`}>
            <BsMessenger size={24} className=" text-gray-500"/>
            <span>{TMessages}</span>
        </Link>
        <Link className={cn(AsideLinkClassName ,)} href={`/${lang}/se`}>
            <IoSettingsOutline size={24} className={cn("text-gray-500" , pathname === `/${lang}/se` && " text-info")}/>
            <span>{TSetting}</span>
        </Link>
    </div>
  )
}
