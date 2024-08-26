import SchoolNotFount from '@/components/error/schoolNotFount';
import { SchoolHomeNews } from '@/components/page/school/home/schoolHomeNews';
import { Locale } from '@/i18n';
import { getSchoolByUsername } from '@/server/getData'
import React from 'react'

interface Props {
    params : {
        schoolUsername : string
        lang : Locale
    }

}

const SchoolUsernamePage =async ({
    params : { schoolUsername, lang}
} : Props) => {
  const school = await getSchoolByUsername(schoolUsername);

  if(!school) return <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>

  return (
    <div>
      <SchoolHomeNews 
       lang={lang}
       schoolUsername={schoolUsername}
      />
      <div className=' h-screen'>
        Other information
      </div>
    </div>
  )
}

export default SchoolUsernamePage
