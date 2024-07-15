"use client";
import { Locale } from '@/i18n'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoHome } from 'react-icons/go'
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { cn } from '@/lib/utils';
import { AsideLinkClassName } from '../style';

export interface ShoolAsideProps {
    lang : Locale
    THome : string
    TClub : string
    TFamily : string
    TGroup : string
}

export const SchoolAsidePublic = ({
    lang, TClub , TFamily , TGroup , THome
} : ShoolAsideProps) => {
    const pathname = usePathname();
  return (
    <div className=' mt-1 flex flex-col px-1'>
        <Link className={cn(AsideLinkClassName , pathname === `/${lang}/s` && " text-warning")} href={`/${lang}/s`}> 
            <GoHome size={24}/>
            <span>{THome}</span>
        </Link>
        {/* <Link className=' btn btn-sm w-full justify-start  btn-ghost hover:bg-black/20' href={`/${lang}/c`}> 
            <FaPeopleGroup size={24}/>
            <span>{TClub}</span>
        </Link> */}
        {/* <Link className=' btn btn-sm w-full justify-start  btn-ghost hover:bg-black/20' href={`/${lang}/g`}> 
            <IoIosPeople size={24}/>
            <span>{TGroup}</span>
        </Link>
        <Link className=' btn btn-sm w-full justify-start  btn-ghost hover:bg-black/20' href={`/${lang}/f`}> 
            <IoPeople size={24}/>
            <span>{TFamily}</span>
        </Link> */}
        
    </div>
  )
}
