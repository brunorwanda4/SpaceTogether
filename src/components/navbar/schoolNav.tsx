import { Logo, SchoolLogo } from './Logo';
import { cn } from '@/lib/utils';
import { MessagesDropDown } from './messagesDropDown';
import { ProfileSheet } from './profileSheet';
import { auth } from '@/auth';
import { FindCreateSchool } from './findCreateSchool';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n';
import { getUserByEmail } from '@/data/getUserData';
import { SchoolNavFindSchool } from './schoolNavFindSchool';

interface props {
    lang : Locale;
    schoolUsername ?: string
    isSe ?: string
}

export const SchoolNav = async ({
    lang , schoolUsername , isSe
} : props) => {
    const user = (await auth())?.user;
    const {nav , page} = await getDictionary(lang);
    const getUser = await getUserByEmail(user?.email);

    if(!getUser) {
        throw Error (`Could not find user ${user?.email}`)
    }
  return (
    <nav className={cn(`fixed flex justify-between z-50 w-full h-12 lg:px-2 md:px-2 py-1 border-b border-neutral-content shadow-md items-center bg-black/20 backdrop-blur-md`)}>
        <div>
            <SchoolLogo 
             lang={lang} 
             title 
             link
             schoolUsername={schoolUsername}
             isSe={isSe}
            />
        </div>
        <div className=' flex gap-2 items-center'>
            {/* find school */}
            <SchoolNavFindSchool lang={lang}/>
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
            <ProfileSheet 
             name={user?.name} 
             image={user?.image} 
             id={user?.id} 
             role={user?.role}
             lang={lang}
             TUser={getUser}
             TLanguageCancel={nav.auth.settingDialog.chooseLanguage.cancel}
             TLanguageChoose={nav.auth.settingDialog.chooseLanguage.changeLanguage}
             TLanguageSave={nav.auth.settingDialog.chooseLanguage.save}
             TTLanguage={nav.auth.settingDialog.language}
            />
        </div>
    </nav>
  )
}
