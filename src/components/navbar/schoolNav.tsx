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
    const {nav , page} = await getDictionary(lang)
  return (
    <nav className={cn(`fixed flex justify-between z-50 w-full h-12 lg:px-2 md:px-2 py-1 border-b border-neutral-content shadow-md items-center bg-black/20 backdrop-blur-md`)}>
        <div>
            <Logo title link/>
        </div>
        <div className=' flex gap-2 '>
            <FindCreateSchool
             TCreate={nav.school.createSchool} 
             TJoin={nav.school.joinSchool} 
             email = {user?.email}
             lang={lang}
             TSchoolProps={{
                TCity : page.school.addSchoolFrom.city,
                TCreateBy : user?.id,
                lang : lang,
                TDescription : page.school.addSchoolFrom.description,
                TEmail : page.school.addSchoolFrom.email,
                TPhone : page.school.addSchoolFrom.phone,
                TName : page.school.addSchoolFrom.name,
                TLocation : page.school.addSchoolFrom.location,
                TLogo : page.school.addSchoolFrom.logo,
                TProvince : page.school.addSchoolFrom.province,
                TType : page.school.addSchoolFrom.type,
                TUsername : page.school.addSchoolFrom.username,
                TWebsite : page.school.addSchoolFrom.website,
                email : user?.email
             }}
            />
            <MessagesDropDown/>
            <ProfileDropDown name={user?.image} image={user?.image} id={user?.id} role={user?.role}/>
        </div>
    </nav>
  )
}
