"use client"

import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { CreateSchoolForm, CreateSchoolProps } from '../page/school/createSchoolForm'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface Props {
    TCreate : string
    TSchoolProps : CreateSchoolProps
    email : string | null | undefined
    className?: string 
}

export const CreateSchoolDialog = ({
    TCreate , TSchoolProps, email, className
} : Props) => {
    const theme = useTheme();
  return (
    <Dialog>
        <DialogTrigger className={cn("btn btn-ghost w-full btn-sm" , className)}>
            {TCreate}
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


