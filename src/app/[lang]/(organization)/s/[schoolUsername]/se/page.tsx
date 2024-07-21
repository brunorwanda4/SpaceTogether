import SchoolNotFount from '@/components/error/schoolNotFount'
import SchoolInfoSettings from '@/components/page/school/settings/schoolInfoSettings'
import { Locale } from '@/i18n'
import { getSchoolByUsername } from '@/server/getData'
import React from 'react'

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
    </div>
  )
}

export default SchoolUsernameSettingPage
