import { Locale } from "@/i18n"

interface props {
  lang : Locale
  params : { exploreSchoolId : string }
}
const ExploreSchoolIdPage = ({
  lang , params : { exploreSchoolId}
} : props) => {
  return (
    <div>
      exploreSchool id page : {exploreSchoolId}
    </div>
  )
}

export default ExploreSchoolIdPage
