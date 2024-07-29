"use client";

import { UserScrollTop } from "@/hooks/scrollTop";
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
  const scroll = UserScrollTop();
  return (
    <div>
      user id : {userId}
      <Link className=" btn" href={`/${lang}/s`}>School</Link>
      <div className=" h-screen"> </div>
      <div className=" h-screen"> {scroll ? <span className=" text-success">Use is scroll</span> : <span className=" text-error">Can no work</span>} </div>
      <div className=" h-screen"> </div>
    </div>
  )
}

export default UserPage
