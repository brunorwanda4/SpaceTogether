import { auth } from "@/auth";
import { Locale } from "@/i18n";
import { Metadata } from "next"
import { redirect } from "next/navigation";

export const metadata : Metadata = {
  title : "Forget password",
} 

interface props {
  params: {lang : Locale}
}
const Page = async ({params : {lang}} : props) => {
  const user = (await auth())?.user;

  if(!!user) {
    redirect(`/${lang}/s`)
  };
  return (
    <div>
      forget password
    </div>
  )
}

export default Page
