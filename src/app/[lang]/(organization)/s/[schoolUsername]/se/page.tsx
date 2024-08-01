import SchoolNotFount from '@/components/error/schoolNotFount'
import SchoolAboutTrainingSetting from '@/components/page/school/settings/schoolAboutTrainingSetting'
import SchoolInfoSettings from '@/components/page/school/settings/schoolInfoSettings'
import { SchoolStorageSetting } from '@/components/page/school/settings/SchoolStorageSetting'
import { Locale } from '@/i18n'
import { getSchoolByUsername } from '@/server/getData'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title : "School Settings"
}

interface props {
    params : {schoolUsername : string , lang : Locale}
}

const SchoolUsernameSettingPage = async ({
     params : {schoolUsername , lang}
} : props) => {
  const school = await getSchoolByUsername(schoolUsername);
  if(!school) return <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>
  return (
    <div className='p-2'>
      <SchoolInfoSettings school={school} lang={lang} username={schoolUsername}/>
      <div className=' w-full flex mt-4 gap-2'>
        {/* left */}
        <div className=' line w-full'>
          <SchoolAboutTrainingSetting lang={lang} school={school}/>
        </div>
        {/* right */}
        <div className=' w-full'>
          <SchoolStorageSetting lang={lang} school={school} />
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  )
}

export default SchoolUsernameSettingPage
