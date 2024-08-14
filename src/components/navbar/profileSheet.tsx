"use client";

import { LuUser2 } from "react-icons/lu";
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme';
import UseOnlineStatus from '@/hooks/useOnlineStatus';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { Locale } from '@/i18n';
import { TUser } from '@/types/user';
import { FaPeopleGroup, FaSchool } from "react-icons/fa6";
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineFlightClass } from "react-icons/md";
import { IoSettingsOutline } from 'react-icons/io5';
import { ChangeLanguages } from './changeLanguages';
import { Languages, LogOutIcon } from 'lucide-react';
import { ChangeThemeDialog } from './ChangeThemeDialog';
import { BsCheck2Circle, BsPerson, BsPersonFill } from "react-icons/bs";
import { SPLine } from "../style/simpleComponents/line";
import { logout } from "@/server/logout";

interface Props {
    image : string | null | undefined,
    name ?: string | null | undefined,
    className?: string | null | undefined,
    id : string | null | undefined,
    role : string | null | undefined,
    lang : Locale
    TUser : TUser | null
    TTLanguage : string
    TLanguageSave : string
    TLanguageCancel : string
    TLanguageChoose : string
}

export const ProfileSheet = ({
    name,className,id,role,image , lang , TUser , TLanguageCancel ,TLanguageChoose ,TLanguageSave ,TTLanguage
} : Props) => {
    const theme = useTheme();
    const online = UseOnlineStatus();
    const pathname = usePathname()
    const route = useRouter();
  return (
    <Sheet>
        <SheetTrigger className='btn btn-circle btn-sm btn-ghost'>
            <span className=' sr-only'>profile</span>
            <div className={cn(" avatar" , online && "online")}>
                <div className=' size-7 relative rounded-full'>
                    <Image src={!!image ? image : "/p.jpg"} alt={cn("your user name :" , name)} fill priority/>
                </div>
            </div>
        </SheetTrigger>
        <SheetContent className=' flex flex-col gap-2' data-theme={theme} side={"right"}>
            {/* profile */}
            {!!TUser ? (
                <SheetClose onClick={() => route.push(`/${lang}/p/${TUser._id}/s`)} className=' flex gap-1'>
                <div className={cn(" avatar" , online && "online")}>
                    <div className=' size-8 relative rounded-full'>
                        <Image src={!!image ? image : "/p.jpg"} alt={cn("your user name :" , name)} fill priority/>
                    </div>
                </div>
                <div>
                    <h2 className='text-lg font-medium text-center'>{name}</h2>
                </div>
            </SheetClose>
            ) : null}
            {/* user data */}
            <SPLine className=" my-0"/>
            {!!TUser ? (
                 <div className='  w-full2 flex flex-col gap-2'>
                 <SheetClose onClick={() => route.push(`/${lang}/p/${TUser._id}`)} className=' flex gap-2 btn btn-ghost btn-sm w-full justify-start'>
                    {pathname === `/${lang}/p/${TUser._id}` ? <BsPersonFill size={20} className={cn("text-info")}/> : <LuUser2 size={20} className={cn("text-gray-500")}/>}
                     <span>You Profile</span>
                 </SheetClose>
                 <SheetClose onClick={() => route.push(`/${lang}/p/${TUser._id}/s`)} className=' flex gap-2 btn btn-ghost btn-sm w-full justify-start cursor-pointer'>
                     <FaSchool size={20} className={cn("text-gray-500" , pathname === `/${lang}/p/${TUser._id}/s` && " text-info")}/>
                     <span>School</span>
                 </SheetClose>
                 <SheetClose onClick={() => route.push(`/${lang}/p/${TUser._id}/c`)} className=' flex gap-2 btn btn-ghost btn-sm w-full justify-start cursor-pointer' >
                     <FaPeopleGroup size={20} className={cn("text-gray-500" , pathname === `/${lang}/p/${TUser._id}/c` && " text-info")}/>
                     <span>Class</span>
                 </SheetClose>
             </div>
            ) : null}
            <SPLine className=" my-0"/>
            <div className='w-full'>
                <ChangeLanguages lang={lang} chooseLang={TLanguageChoose} TCancel={TLanguageCancel} TSave={TLanguageSave} title={TTLanguage}>
                    <div className='flex gap-2 items-center btn btn-ghost btn-sm w-full justify-between '>
                        <div className=' flex gap-2 items-center'>
                            <Languages size={20} className={cn("text-gray-500")}/>
                            <span>{TTLanguage}</span>
                        </div>
                        <span className="badge badge-outline">{lang}</span>
                    </div>
                </ChangeLanguages>
                <ChangeThemeDialog />
                <SheetClose className=' flex gap-2 btn btn-ghost btn-sm w-full justify-between cursor-pointer' onClick={() => route.push(`/${lang}/se`)}>
                    <div className="flex gap-2">
                        <IoSettingsOutline size={20} className={cn("text-gray-500",)}/>
                        <span>Settings</span>
                    </div>
                    {pathname === `/${lang}/se` && <BsCheck2Circle/>}
                </SheetClose>
            </div>
            <SPLine className=" my-0"/>
            <div>
                <button className=" btn text-error btn-ghost btn-sm w-full justify-start flex gap-2" onClick={() => logout()}>
                    <LogOutIcon size={20} className=" text-gray-500"/>
                    <span>Login out</span>
                </button>
            </div>
        </SheetContent>
    </Sheet>
  )
}
