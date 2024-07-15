import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsMessenger } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { AsideLinkClassName } from "../style";

interface Props {
    lang : string;
    TSetting : string;
    TMessages : string;
}

export const SchoolAsideMain = ({
    lang,TSetting ,TMessages
} : Props) => {
  return (
    <div className='flex flex-col gap-1 w-full justify-start border-t border-neutral px-1 py-1 '>
        <Link className={cn(AsideLinkClassName)} href={`/${lang}/m`}>
            <BsMessenger size={24}/>
            <span>{TMessages}</span>
        </Link>
        <Link className={cn(AsideLinkClassName)} href={`/${lang}/se`}>
            <IoSettingsOutline size={24}/>
            <span>{TSetting}</span>
        </Link>
    </div>
  )
}
