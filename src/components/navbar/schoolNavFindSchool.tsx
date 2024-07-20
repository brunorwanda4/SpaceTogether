"use client";

import { Locale } from "@/i18n";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { FiSearch } from "react-icons/fi";

interface props {
    lang : Locale
}

export const SchoolNavFindSchool = ({
    lang
} : props) => {
    const pathname = usePathname();
    if(pathname !== `/${lang}/s/e`) return null;
  return (
    <div className=" lg:w-64 relative">
        <Input autoFocus className=" bg-transparent" placeholder="Searcher school"/>
        <button className=" absolute top-0 right-0 w-8 duration-200 hover:bg-base-300 flex items-center justify-center h-full rounded-r-md"><FiSearch size={20}/></button>
    </div>
  )
}
