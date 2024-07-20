import { MyImage } from '@/components/style/myImage'
import { Locale } from '@/i18n'
import Link from 'next/link'
import React from 'react'

interface Props {
    lang : Locale
    schoolUsername : string
}

export const SchoolHomeNews = ({
    lang , schoolUsername
} : Props) => {
  return (
    <main className=' relative h-60'>
        <MyImage className=' h-full w-full' src='/images/2.jpg'/>
       <div className=' absolute bottom-2 right-2'>
            <Link className=' btn btn-info btn-ghost' href={`/${lang}/s/${schoolUsername}/news`}>  See more news</Link>
       </div>
    </main>
  )
}
