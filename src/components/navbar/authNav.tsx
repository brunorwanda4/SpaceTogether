import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { BsGear, BsGearFill, BsHouse } from "react-icons/bs"
import { PiHouseFill } from "react-icons/pi"
import Link from 'next/link';
import { LangPageProps } from '@/types/pages';
import { getDictionary } from '@/lib/dictionary';
import { Languages } from 'lucide-react';
import { ChangeLanguages } from './changeLanguages';
import { SPLine } from '../style/simpleComponents/line';
import { AuthChangeTheme } from './authChangeTheme';

export const AuthNav = async ({lang} : LangPageProps) => {
    const {nav} = await getDictionary(lang)
  return (
    <nav className=' fixed z-50 flex justify-end w-full p-2 max-lg:p-2'>
        <div className=' flex gap-2'>
            <Link href={`/${lang}`} className=' btn btn-square'>
                <span className=' sr-only'>Go back</span>
                <PiHouseFill size={24} className=''/>
            </Link>
            <Dialog>
                <DialogTrigger className=' btn btn-square'>
                    <BsGearFill size={24} className=''/>
                    <span className=' sr-only'>Setting</span>
                </DialogTrigger>
                <DialogContent className=' bg-base-300 '>
                    <DialogTitle>
                        {nav.auth.settingDialog.setting}
                    </DialogTitle>
                    <SPLine />
                    <div className=''>
                        <ChangeLanguages TSave={nav.auth.settingDialog.chooseLanguage.save} TCancel={nav.auth.settingDialog.chooseLanguage.cancel} title={nav.auth.settingDialog.language} lang={lang} chooseLang={nav.auth.settingDialog.chooseLanguage.changeLanguage} />
                        <SPLine className=' mb-2'/>
                        <div>
                            <AuthChangeTheme title={nav.auth.settingDialog.changeTheme}/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </nav>
  )
}
