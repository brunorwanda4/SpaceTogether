"use client"

import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { CreateSchoolForm, CreateSchoolProps } from '../page/school/createSchoolForm'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Locale } from '@/i18n'
import { BsCheck2Circle } from 'react-icons/bs'

interface Props {
    TCreate : string
    TSchoolProps : CreateSchoolProps
    email : string | null | undefined
    className?: string 
    lang : Locale
}

export const CreateSchoolDialog = ({
    TCreate , TSchoolProps, email, className , lang
} : Props) => {
    const theme = useTheme();
    const pathname = usePathname();
  return (
    <Dialog>
        <DialogTrigger className={cn("btn btn-ghost w-full btn-sm justify-between",)}>
            {TCreate}
            {pathname === `/${lang}/s/c` && (<BsCheck2Circle />)}
        </DialogTrigger >
        <DialogContent className='  overflow-y-auto max-h-2xl max-h-[90vh]' data-theme={theme}>
            <CreateSchoolForm
             TCreateBy={TSchoolProps.TCreateBy}
             lang={TSchoolProps.lang}
             TCity={TSchoolProps.TCity}
             TDescription={TSchoolProps.TDescription}
             TEmail={TSchoolProps.TEmail}
             TLocation={TSchoolProps.TLocation}
             TLogo={TSchoolProps.TLogo}
             TName={TSchoolProps.TName}
             TPhone={TSchoolProps.TPhone}
             TProvince={TSchoolProps.TProvince}
             TType={TSchoolProps.TType}
             TUsername={TSchoolProps.TUsername}
             TWebsite={TSchoolProps.TWebsite}
             email = {email}
            />
        </DialogContent>
    </Dialog>
  )
}


