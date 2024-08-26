import { auth } from "@/auth"
import { ExplorePaidSchool } from "@/components/page/school/explore/explorePaidSchool"
import { getSchoolsPaid } from "@/data/getSchool"
import { Locale } from "@/i18n"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata : Metadata = {
  title : "Explore Schools"
}

interface props {
  params : {lang : Locale}
};
const ExploreSchoolPage = async ({
  params : {lang }
} : props) => {
  const user = (await auth())?.user;
  if (!user) return redirect(`/${lang}/auth/login`);
  
  const schools = await getSchoolsPaid();
  return (
    <div>
      <ExplorePaidSchool 
       schools={schools}
       lang={lang}
      />
      <div className=" h-screen">
      </div>
    </div>
  )
}

export default ExploreSchoolPage
