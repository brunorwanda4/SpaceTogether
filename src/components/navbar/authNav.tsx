import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { BsGear, BsGearFill, BsHouse } from "react-icons/bs"
import { PiHouseFill } from "react-icons/pi"
import Link from 'next/link';
import { LangPageProps } from '@/types/pages';

export const AuthNav = ({lang} : LangPageProps) => {
  return (
    <nav className=' fixed z-50 flex justify-end w-full p-2 max-lg:p-2'>
        <div className=' flex gap-2'>
            <Link href={`/${lang}`} className=' btn btn-square'>
                <span className=' sr-only'>Go back</span>
                <PiHouseFill size={26} className=''/>
            </Link>
            <Dialog>
                <DialogTrigger className=' btn btn-square'>
                    <BsGearFill size={26} className=''/>
                    <span className=' sr-only'>Setting</span>
                </DialogTrigger>
                <DialogContent className=' bg-base-300'>
                    <DialogTitle>
                        Settings
                    </DialogTitle>
                    <div className=' h-1 w-full bg-base-100'/>
                    <div>
                        Language
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </nav>
  )
}
