import { auth } from "@/auth";
import { Locale } from "@/i18n";
import { Metadata } from "next"
import { redirect } from "next/navigation";

export const metadata:Metadata = {
  title : "Messages"
}

interface props {
  params : {lang: Locale}
}

const MessagePage = async ({
  params : {lang}
} : props) => {
  const user = (await auth())?.user;
  
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  };
  // TODO: fetch and display messages
  return (
    <div className=" ">
      hello you
    </div>
  )
}

export default MessagePage
