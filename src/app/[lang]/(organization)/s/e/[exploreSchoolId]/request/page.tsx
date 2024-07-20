import { Locale } from "@/i18n"

interface props {
    lang : Locale
    params : { exploreSchoolId : string }
}

const RequestToJoinSchoolPage = ( {
    lang , params : {exploreSchoolId}
} : props) => {
  return (
    <div>
      RequestToJoinSchoolPage : {exploreSchoolId} / request
    </div>
  )
}

export default RequestToJoinSchoolPage
