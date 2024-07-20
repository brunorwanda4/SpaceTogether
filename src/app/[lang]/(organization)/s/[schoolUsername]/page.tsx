import { MyImage } from '@/components/style/myImage'
import { getSchoolByUsername } from '@/server/getData'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

interface Props {
    params : {
        schoolUsername : string
        lang : string
    }

}

const SchoolUsernamePage =async ({
    params : { schoolUsername, lang}
} : Props) => {
  const school = await getSchoolByUsername(schoolUsername);

  if(!school) {
    return (
      <div className=' place-content-center grid size-full'>
        <div>
          <MyImage className=' size-96' src='/notFound.svg'/>
        </div>
        <div className=' flex flex-col gap-2 items-center justify-center'>
          <h1 className=' font-bold text-2xl'>Oops! School not found</h1>
          <p>We couldn{`'`}t find a school with the username <span className=' text-error font-semibold'>{schoolUsername}</span></p>
          <div>
            <Link className=' btn btn-info group/linkBack' href={`/${lang}/s`}>
              <FaArrowLeftLong className='group-hover/linkBack:scale-x-110 duration-200'/> Go back on home page
            </Link>
          </div>
        </div>
      </div>
    )
    
  }
  return (
    <div>
      School user name page : 
      {school ? "they are school 🌳" : "they are not ❤️"}
    </div>
  )
}

export default SchoolUsernamePage
