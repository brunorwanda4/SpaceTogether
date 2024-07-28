import { Locale } from "@/i18n"
import Link from "next/link"

interface props {
  params : {
    lang : Locale
    userId : string
  }
}
const UserPage = ({
  params: {lang , userId}
}: props) => {
  return (
    <div>
      user id : {userId}
      <Link className=" btn" href={`/${lang}/s`}>School</Link>
    </div>
  )
}

export default UserPage
