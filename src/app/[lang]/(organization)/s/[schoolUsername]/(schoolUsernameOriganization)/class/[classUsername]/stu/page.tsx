import SchoolNotFount from "@/components/error/schoolNotFount"
import ClassNavStudent from "@/components/navbar/ClassNavStudent"
import { Locale } from "@/i18n"
import { getSchoolByUsername } from "@/server/getData"

interface props {
  params : {
    lang : Locale,
    schoolUsername : string
  }
}
const ClassStudentPage = async ({
  params : {lang , schoolUsername}
} : props) => {
  const school = await getSchoolByUsername(schoolUsername);

  if (!school) return (
    <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>
  )

  return (
    <div>
      <ClassNavStudent lang={lang} school={school} schoolUsername={schoolUsername}/>
    </div>
  )
}

export default ClassStudentPage
