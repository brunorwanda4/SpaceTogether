import { auth } from "@/auth";
import { UserScrollTop } from "@/hooks/scrollTop";
import { Locale } from "@/i18n"
import Link from "next/link"
import { redirect } from "next/navigation";

interface props {
  params : {
    lang : Locale
    userId : string
  }
}
const UserPage =async ({
  params: {lang , userId}
}: props) => {
  const user = ( await auth())?.user;
  if (!user) redirect(`/${lang}`);

 
  return (
    <div>
      user id : {userId}
      <Link className=" btn" href={`/${lang}/s`}>School</Link>

      <div>
        {user.image}
      </div>

      <div className=" h-screen"> </div>
      <div className=" h-screen"> </div>
    </div>
  )
}

export default UserPage
