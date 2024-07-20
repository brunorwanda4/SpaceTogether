import { cn } from "@/lib/utils"
import { FaSchool } from "react-icons/fa6"
import { AsideLinkClassName } from "../style"
import Link from "next/link"
import { TSchoolWithUser } from "@/types/school"
import { MyImage } from "../style/myImage"
import { Locale } from "@/i18n"
import { BsCheck2Circle } from "react-icons/bs"

interface props {
    schools : TSchoolWithUser[]
    lang : Locale
    schoolUsername : string
}

export const SchoolAsideInfo = ({
    schools, lang , schoolUsername
} : props) => {
  return (
    <ul className=" menu menu-md w-full  px-1">
        <li>
            <details>
                <summary>
                    <FaSchool className={cn("text-gray-500" , schoolUsername && " text-warning")} size={24} />
                    <span>School</span>
                </summary>
                <ul>
                {schools.map((school) => {
                    return (
                        <li key={school.id}>
                            <Link className={cn()} href={`/${lang}/s/${school.username}`}>
                                <MyImage className=" size-5" classname=" rounded-full" src={school.logo || "/p.jpg"}/>
                                <span>{school.name}</span>
                                {schoolUsername === school.username && (
                                    <BsCheck2Circle />
                                )}
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </details>
        </li>
    </ul>
  )
}
