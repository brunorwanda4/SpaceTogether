import { SchoolMenuSettings } from "@/components/menu/schoolMenuSettings"
import { SchoolNav } from "@/components/navbar/schoolNav"
import { Locale } from "@/i18n"
import { getSchoolByUsername } from "@/server/getData"

interface props {
    params : {lang : Locale , schoolUsername : string}
    children : React.ReactNode
}

const SchoolSettingLayout = async ({
    children , params : {lang , schoolUsername}
} : props) => {
  const school = await getSchoolByUsername(schoolUsername)
  return (
    <section>
      <SchoolNav 
       lang={lang} 
       schoolUsername={schoolUsername}
       isSe={"settings"}
    />
     <SchoolMenuSettings username={schoolUsername} school={school} lang={lang}>
      {children}
     </SchoolMenuSettings>
    </section>
  )
}

export default SchoolSettingLayout

