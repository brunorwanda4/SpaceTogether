import { Locale } from "@/i18n";
import { ISchool } from "@/types/school";
import Link from "next/link";
import { IoMdCloud } from "react-icons/io";

interface props {
    school : ISchool;
    lang : Locale;
}

export const SchoolStorageSetting = ({
    school, lang
} :  props) => {
    const schoolPathnameSettings = `/${lang}/s/${school.username}/se`;
  return (
    <div className=" card bg-base-300 h-auto shadow-lg p-2">
        <div className=" flex gap-2 items-center">
            <IoMdCloud className=" text-info" size={28}/>
            <h3 className="text-xl font-bold lg:text-xl">School Database</h3>
        </div>
        <p className=" text-gray-500">Store school-specific data such as students, teachers, and classes here. make sure you have internet!</p>
        <div className=" relative w-auto"><Link className=" btn btn-sm  mt-2 w-auto" href={`${schoolPathnameSettings}/sto`}>See more information</Link></div>
    </div>
  )
}
