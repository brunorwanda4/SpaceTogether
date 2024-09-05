"use client";

import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { BsGear, BsGearFill, BsHouse } from "react-icons/bs"
import { Languages } from 'lucide-react';
import { ChangeLanguages } from './changeLanguages';
import { SPLine } from '../style/simpleComponents/line';
import { AuthChangeTheme } from './authChangeTheme';
import { Locale } from '@/i18n';
import { useTheme } from '@/hooks/useTheme';

interface Props {
    title: string
    chooseLang: string
    lang: Locale;
    TSave : string
    TCancel : string
    TSetting : string
    TTLanguage : string
  }

export const AuthNav = ({
    title, lang, TSave,TCancel,chooseLang,TSetting,TTLanguage
} : Props) => {
    const theme = useTheme();
  return (
    <nav className=' fixed z-50 flex justify-end w-full p-2 max-lg:p-2 px-2 max-lg:px-1'>
        <div className=' flex gap-2'>
            <Dialog>
                <DialogTrigger className=' btn btn-square'>
                    <BsGearFill size={24} className=''/>
                    <span className=' sr-only'>{TSetting}</span>
                </DialogTrigger>
                <DialogContent 
                 data-theme={theme} 
                 className=' bg-base-300 max-md:left-[50%] max-md:top-[50%] max-md:w-[95%] max-md:max-w-[95%]'>
                    <DialogTitle>
                        {TSetting}
                    </DialogTitle>
                    <SPLine />
                    <div className=' '>
                        <ChangeLanguages 
                         TSave={TSave} 
                         TCancel={TCancel} 
                         title={TTLanguage} 
                         lang={lang} 
                         chooseLang={chooseLang} 
                        />
                        <SPLine className=' mb-2'/>
                        <div>
                            <AuthChangeTheme title={title}/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </nav>
  )
}
