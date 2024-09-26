"use client";

import { Locale } from "@/i18n"
import { cn } from "@/lib/utils"
import { ISchool } from "@/types/school"
import Link from "next/link"
import { AsideLinkClassName } from "../style"
import { useParams } from "next/navigation";

interface props {
    lang : Locale
    school : ISchool | null
    username : string;
}
const SchoolUsernameAside = ({
    lang , school , username
} : props) => {
    const {classUsername , schoolUsername} = useParams();


    if (!classUsername) return null;


  return (
    <div>
      <div>
        Bruno Rwanda
      </div>
      <Link className={cn(AsideLinkClassName)} href={`/${lang}/s/${username}/se`}>
        settings
      </Link>
    </div>
  )
}

export default SchoolUsernameAside
