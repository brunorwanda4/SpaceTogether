import { Locale } from "@/i18n"
import { cn } from "@/lib/utils"
import { ISchool } from "@/types/school"
import Link from "next/link"
import { AsideLinkClassName } from "../style"

interface props {
    lang : Locale
    school : ISchool | null
    username : string;
}
const SchoolUsernameAside = ({
    lang , school , username
} : props) => {
    if (!school) return null
  return (
    <div>
      <Link className={cn(AsideLinkClassName)} href={`/${lang}/s/${username}/se`}>
        settings
      </Link>
    </div>
  )
}

export default SchoolUsernameAside
