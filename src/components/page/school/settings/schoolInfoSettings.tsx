import { Locale } from '@/i18n'
import React, { useState } from 'react'
import AskCreateSchoolChildrenDialog from './askCreateSchoolChildrenDialog'
import { ISchool } from '@/types/school'
import { MyImage } from '@/components/style/myImage'
import Link from 'next/link'
import SchoolUpdateInfoSettingDialog from './SchoolUpdateInfoSettingDialog'
import SchoolDeleteSettingDialog from './SchoolDeleteSettingDialog'

interface props {
    lang : Locale
    username : string
    school : ISchool
}

const SchoolInfoSettings = ({
    lang, username , school
} : props) => {
  return (
    <div className=' flex gap-4 flex-col'>
      <div className='  flex justify-between w-full items-center'>
        <h3 className='text-xl font-bold lg:text-2xl'>School information settings</h3>
        <AskCreateSchoolChildrenDialog />
      </div>
      {/* school information */}
      <div className=' card w-full bg-base-300 min-h-80 shadow-lg p-2'>
        {/* school logo */}
        <div className=' justify-between flex items-center'>
            <div className=' flex gap-2 items-center'>
                <MyImage className=' size-14' classname='object-contain' src={school.logo}/>
                <div className=' flex flex-col'>
                    <span className=' text-lg font-semibold'>{school.name}</span>
                    <span className='text-sm'><span className=' text-info'>@</span>{school.username}</span>
                </div>
            </div>
            <div className=' flex gap-2'>
                <SchoolUpdateInfoSettingDialog  id={school._id} username={username} lang={lang}/>
                <SchoolDeleteSettingDialog id={school._id} username={username} lang={lang}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolInfoSettings
