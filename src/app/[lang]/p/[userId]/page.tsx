import { auth } from "@/auth";
import { UserScrollTop } from "@/hooks/scrollTop";
import { Locale } from "@/i18n"
import { IUser } from "@/types/user";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import Link from "next/link"
import { redirect } from "next/navigation";

interface props {
  params : {
    lang : Locale
    userId : string
  }
}
const ProfilePage =async ({
  params: {lang , userId}
}: props) => {
  const user = ( await auth())?.user;

  if (!user) return redirect(`/${lang}`);

  // const tauri_user = await invoke("api_user_authentication_create", {id : user.id});
 
  // const get_user_tauri = await invoke("api_user_data_get", {id : user.id});

  return (
    <div>
      user id : {userId}
      <Link className=" btn" href={`/${lang}/s`}>School</Link>

      <div>
        {user.image && <Image src={user.image} alt="user profile image" width={32} height={32}/>}
      </div>

      {/* user form tauri is {tauri_user.UserModel.name}; */}

      <div className=" h-screen"> </div>
      <div className=" h-screen"> </div>
    </div>
  )
}

export default ProfilePage
