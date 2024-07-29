import { auth } from "@/auth"
import { SchoolMenuUsername } from "@/components/menu/schoolMenuUsername"
import { SchoolNav } from "@/components/navbar/schoolNav"
import { getUserByEmail } from "@/data/getUserData"
import { Locale } from "@/i18n"
import { getDictionary } from "@/lib/dictionary"
import { getSchoolByUsername } from "@/server/getData"
import { redirect } from "next/navigation"

interface props {
    params :{lang : Locale , schoolUsername : string}
    children : React.ReactNode
}
const SchoolUsernameLayout = async ({
    params : {lang , schoolUsername} , children
} : props) => {
  const school = await getSchoolByUsername(schoolUsername);
  const user = (await auth())?.user;
  const {nav , page} = await getDictionary(lang);
  const getUser = await getUserByEmail(user?.email);

  if(!getUser) {
      return redirect(`/${lang}`);
  }
  return (
    <section>
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
