import { SchoolMenu } from '@/components/menu/schoolMenu'
import { FooterOrganization } from '@/components/navbar/footerOrganization'
import { SchoolNav } from '@/components/navbar/schoolNav'
import { LanguagesProps } from '@/types/pages'
import React from 'react'

const SchoolLayout = ({
    params : {lang} , children
} : LanguagesProps) => {
  return (
    <section>
      <SchoolNav lang={lang}/>
        <div className=''>
          <SchoolMenu lang={lang}>
              {children}
          </SchoolMenu>
        </div>
        {/* <FooterOrganization/> */}
    </section>
  )
}

export default SchoolLayout
