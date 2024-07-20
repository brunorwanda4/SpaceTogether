import { SchoolMenu } from '@/components/menu/schoolMenu'
import { SchoolNav } from '@/components/navbar/schoolNav'
import { Locale } from '@/i18n'
import { LanguagesProps } from '@/types/pages'
import React from 'react'

interface Props {
  params : {
    lang : Locale
  }
  children : React.ReactNode
}

const SchoolLayout = ({
    params : {lang ,} , children
} : Props) => {
  return (
    <section>
      <SchoolNav lang={lang}/>
        <div className=''>
          <SchoolMenu
            lang={lang}
          >
              {children}
          </SchoolMenu>
        </div>
        {/* <FooterOrganization/> */}
    </section>
  )
}

export default SchoolLayout
