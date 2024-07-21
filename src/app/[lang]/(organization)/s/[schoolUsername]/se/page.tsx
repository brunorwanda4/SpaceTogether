import SchoolNotFount from '@/components/error/schoolNotFount'
import SchoolInfoSettings from '@/components/page/school/settings/schoolInfoSettings'
import { Locale } from '@/i18n'
import { getSchoolByUsername } from '@/server/getData'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title : "School Settings"
}

interface props {
    lang : Locale
    params : {schoolUsername : string}
}

const SchoolUsernameSettingPage = async ({
    lang, params : {schoolUsername}
} : props) => {
  const school = await getSchoolByUsername(schoolUsername);
  if(!school) return <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>
  return (
    <div className='p-2'>
      <SchoolInfoSettings school={school} lang={lang} username={schoolUsername}/>
      <div className="h-screen"></div>
    </div>
  )
}

export default SchoolUsernameSettingPage
