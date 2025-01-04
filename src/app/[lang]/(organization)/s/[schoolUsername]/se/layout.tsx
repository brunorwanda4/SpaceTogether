import { auth } from "@/auth"
import { SchoolMenuSettings } from "@/components/menu/schoolMenuSettings"
import { SchoolNav } from "@/components/navbar/schoolNav"
import { Locale } from "@/i18n"
import { getSchoolByUsername } from "@/server/getData"
import { redirect } from "next/navigation"

interface props {
    params : {lang : Locale , schoolUsername : string}
    children : React.ReactNode
}

const SchoolSettingLayout = async ({
    children , params : {lang , schoolUsername}
} : props) => {
  const school = await getSchoolByUsername(schoolUsername);
  if(!school) return (redirect(`/${lang}/s`));
  const user = (await auth())?.user
  // if(!user) return (redirect(`/${lang}`));
  return (
    <section>
     <SchoolMenuSettings username={schoolUsername} school={school} lang={lang}>
      {children}
     </SchoolMenuSettings>
    </section>
  )
}

export default SchoolSettingLayout

