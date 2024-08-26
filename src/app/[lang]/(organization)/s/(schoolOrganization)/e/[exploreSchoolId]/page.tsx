import { auth } from "@/auth"
import { Locale } from "@/i18n"
import { redirect } from "next/navigation"

interface props {
  params : { exploreSchoolId : string , lang : Locale }
}
const ExploreSchoolIdPage =async ({
  params : { exploreSchoolId , lang}
} : props) => {
  const user = (await auth())?.user;
  if(!user) return redirect(`/${lang}/auth/login`)
  return (
    <div>
      exploreSchool id page : {exploreSchoolId}
    </div>
  )
}

export default ExploreSchoolIdPage