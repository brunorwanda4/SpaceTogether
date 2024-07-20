"use client";

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { BsMessenger } from 'react-icons/bs'
import { useTheme } from '@/hooks/useTheme';

export const MessagesDropDown = () => {
    const theme = useTheme()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className=' btn btn-circle btn-sm'>
            <span className=' sr-only'>Messages</span>
            <BsMessenger size={24} className=''/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border' data-theme={theme}>
            <div>
                Messages
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
