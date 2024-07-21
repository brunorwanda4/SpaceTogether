import { Locale } from "@/i18n"
import { ISchool } from "@/types/school"

interface props {
    lang : Locale
    school : ISchool | null
}
const SchoolUsernameAside = ({
    lang , school
} : props) => {
    if (!school) return null
  return (
    <div>
      school username aside
    </div>
  )
}

export default SchoolUsernameAside
