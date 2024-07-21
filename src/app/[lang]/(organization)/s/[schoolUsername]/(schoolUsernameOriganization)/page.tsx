import SchoolNotFount from '@/components/error/schoolNotFount';
import { SchoolHomeNews } from '@/components/page/school/home/schoolHomeNews';
import { MyImage } from '@/components/style/myImage'
import { Locale } from '@/i18n';
import { getSchoolByUsername } from '@/server/getData'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

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
      <div>
        Other information
      </div>
    </div>
  )
}

export default SchoolUsernamePage
