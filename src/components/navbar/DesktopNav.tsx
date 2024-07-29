import { auth } from '@/auth';
import { ProfileSheet } from './profileSheet';
import { MessagesDropDown } from './messagesDropDown';
import { getDictionary } from '@/lib/dictionary';
import { getUserByEmail } from '@/data/getUserData';
import { Locale } from '@/i18n';
import { FindCreateSchool } from './findCreateSchool';
import { SchoolNavFindSchool } from './schoolNavFindSchool';
import { BsBellFill } from 'react-icons/bs';
import { redirect } from 'next/navigation';

interface props {
    lang : Locale
}

const DesktopNav =async ({lang} : props) => {
    const user = (await auth())?.user;
    const {nav , page} = await getDictionary(lang);
    const getUser = await getUserByEmail(user?.email);
    if (!getUser) return redirect(`/${lang}`);
  return (
    <nav className=' py-1'>
      <div className=' flex gap-2 items-center'>
          <div className=' btn btn-sm btn-circle btn-ghost'>
            <BsBellFill size={24}/>
          </div>
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

export default DesktopNav
