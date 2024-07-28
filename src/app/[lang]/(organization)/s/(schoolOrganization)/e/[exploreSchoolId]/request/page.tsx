import SchoolNotFount from "@/components/error/schoolNotFount"
import AskToJoinSchool from "@/components/forms/explore/askToJoinSchool"
import ExploreAskToJoin from "@/components/page/school/explore/exploreAskToJoin"
import { Locale } from "@/i18n"
import {  getSchoolByUsername } from "@/server/getData"

interface props {
    params : { exploreSchoolId : string  , lang : Locale}
}

const RequestToJoinSchoolPage = async ({
   params : {exploreSchoolId , lang}
} : props) => {
  const school = await getSchoolByUsername(exploreSchoolId);

  if (!school) return (
    <SchoolNotFount lang={lang} schoolUsername={exploreSchoolId}/>
  );
  return (
    <div>
      {/* school info */}
      <main className="card bg-base-300 shadow-lg min-w-96 p-4 min-h-60 h-auto mt-2 w-full">
        <ExploreAskToJoin 
        lang={lang}
        school={school}
        />
        <AskToJoinSchool 
          school = {school}
         />
      </main>
      <div className=" h-screen">
      </div>
    </div>
  )
}

export default RequestToJoinSchoolPage
