"use client";

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme';
import UseOnlineStatus from '@/hooks/useOnlineStatus';
import { AuthNav } from './authNav';

interface Props {
    image : string | null | undefined,
    name ?: string | null | undefined,
    className?: string | null | undefined,
    id : string | null | undefined,
    role : string | null | undefined,
}

export const ProfileDropDown = ({
    name,className,id,role,image
} : Props) => {
    const theme = useTheme();
    const online = UseOnlineStatus();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='btn btn-circle btn-sm duration-200 hover:text-neutral'>
            <span className=' sr-only'>profile</span>
            <div className={cn(" avatar" , online && "online")}>
                <div className=' size-7 relative rounded-full'>
                    <Image src={!!image ? image : "/p.jpg"} alt={cn("your user name :" , name)} fill priority/>
                </div>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-theme={theme}>
             <AuthNav/>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
