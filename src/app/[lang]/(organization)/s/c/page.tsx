import { auth } from "@/auth"
import { CreateSchoolForm } from "@/components/page/school/createSchoolForm"
import { Locale } from "@/i18n"
import { getDictionary } from "@/lib/dictionary"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata:Metadata = {
  title : "Create School",
}

interface Props {
  params : {lang : Locale}
}

const CreteSchoolPage = async ({
  params : {lang}
} : Props) => {
  const user = (await auth())?.user; 
  const {page} = await getDictionary(lang);
  return (
    <div className=" card p-2 grid place-content-center">
      <main className={cn("card bg-base-300 shadow-lg min-w-96 p-4 max-w-2xl")}>
        <CreateSchoolForm 
         email={user?.email}
         TCreateBy={user?.id}
         lang={lang}
         TName={page.school.addSchoolFrom.name}
         TUsername={page.school.addSchoolFrom.username}
         TEmail={page.school.addSchoolFrom.email}
         TPhone={page.school.addSchoolFrom.phone}
         TType={page.school.addSchoolFrom.type}
         TLocation={page.school.addSchoolFrom.location}
         TCity={page.school.addSchoolFrom.city}
         TDescription={page.school.addSchoolFrom.description}
         TLogo={page.school.addSchoolFrom.logo}
         TProvince={page.school.addSchoolFrom.province}
         TWebsite={page.school.addSchoolFrom.website}
         />
      </main>
    </div>
  )
}

export default CreteSchoolPage
