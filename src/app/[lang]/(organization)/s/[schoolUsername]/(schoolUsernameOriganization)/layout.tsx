import { SchoolMenuUsername } from "@/components/menu/schoolMenuUsername"
import { SchoolNav } from "@/components/navbar/schoolNav"
import { Locale } from "@/i18n"
import { getSchoolByUsername } from "@/server/getData"

interface props {
    params :{lang : Locale , schoolUsername : string}
    children : React.ReactNode
}
const SchoolUsernameLayout = async ({
    params : {lang , schoolUsername} , children
} : props) => {
  const school = await getSchoolByUsername(schoolUsername)
  return (
    <section>
      <SchoolNav schoolUsername={schoolUsername} lang={lang}/>
      <SchoolMenuUsername 
        school={school}
        lang={lang}
        schoolUsername={schoolUsername}
      >
        {children}
      </SchoolMenuUsername>
    </section>
  )
}

export default SchoolUsernameLayout
