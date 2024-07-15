import React from 'react'
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { MessagesDropDown } from './messagesDropDown';
import { ProfileDropDown } from './profileDropDown';
import { auth } from '@/auth';
import { FindCreateSchool } from './findCreateSchool';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n';

interface props {
    lang : Locale;
}

export const SchoolNav = async ({lang} : props) => {
    const user = (await auth())?.user;
    const {nav} = await getDictionary(lang)
  return (
    <nav className={cn(`fixed flex justify-between z-50 w-full h-12 lg:px-2 md:px-2 py-1 border-b border-neutral-content shadow-md items-center bg-black/20 backdrop-blur-md`)}>
        <div>
            <Logo title link/>
        </div>
        <div className=' flex gap-2 '>
            <FindCreateSchool TCreate={nav.school.createSchool} TJoin={nav.school.joinSchool} lang={lang}/>
            <MessagesDropDown/>
            <ProfileDropDown name={user?.image} image={user?.image} id={user?.id} role={user?.role}/>
        </div>
    </nav>
  )
}
