"use client";

import Link from 'next/link'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { Locale } from '@/i18n';
import { JoinSchoolDialog } from './joinSchoolDialog';

interface props {
    lang : Locale
    TCreate : string
    TJoin : string
}

export const FindCreateSchool = ({
    lang , TCreate, TJoin
} : props) => {
    const theme = useTheme();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className=' btn btn-circle btn-sm duration-200 '>
            <span className=' sr-only'>create or join class</span>
            <BsPlus size={24} className=''/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' w-40 min-h-20 border' data-theme={theme}>
            <div>
                <JoinSchoolDialog TJoin={TJoin}/>
                <Link className=' btn btn-ghost w-full btn-sm' href={`/${lang}/s/c`} >{TCreate}</Link>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
