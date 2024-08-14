"use client";

import Link from 'next/link'
import { BsCheck2Circle, BsPlus } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { Locale } from '@/i18n';
import { JoinSchoolDialog } from './joinSchoolDialog';
import { usePathname } from 'next/navigation';
import { CreateSchoolDialog } from './createSchoolDialog';
import { CreateSchoolProps } from '../page/school/createSchoolForm';

interface props {
    lang : Locale
    TCreate : string
    TJoin : string
    TSchoolProps : CreateSchoolProps
    email : string | null | undefined
}

export const FindCreateSchool = ({
    lang , TCreate, TJoin , TSchoolProps , email
} : props) => {
    const theme = useTheme();
    const pathname = usePathname();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className=' btn btn-circle btn-sm btn-ghost'>
            <span className=' sr-only'>create or join class</span>
            <BsPlus size={24} className=''/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' w-40 min-h-20 border' data-theme={theme}>
            <div>
                <JoinSchoolDialog TJoin={TJoin}/>
                <Link className='btn btn-ghost w-full btn-sm justify-between ' href={`/${lang}/s/e`}>Explore school{pathname === `/${lang}/s/e` && (<BsCheck2Circle />)}</Link>
                <CreateSchoolDialog 
                TCreate={TCreate}
                TSchoolProps={TSchoolProps}
                email={email}
                lang = {lang}
                />
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
