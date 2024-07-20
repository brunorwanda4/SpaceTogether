"use client";
import { Locale } from '@/i18n'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import { AsideLinkClassName } from '../style';
import { GoHomeFill } from "react-icons/go";

export interface ShoolAsideProps {
    lang : Locale
    THome : string
    TClub : string
    TFamily : string
    TGroup : string
}

export const SchoolAsidePublic = ({
    lang, TClub , TFamily , TGroup , THome ,
} : ShoolAsideProps) => {
    const pathname = usePathname();
    
  return (
    <div className=' mt-1 flex flex-col px-1'>
        <Link className={cn(AsideLinkClassName ,)} href={`/${lang}/s`}> 
            <GoHomeFill size={24} className={cn( " text-gray-500" , pathname === `/${lang}/s` && " text-warning")}/>
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
