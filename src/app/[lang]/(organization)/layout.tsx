import { SchoolMenu } from '@/components/menu/schoolMenu'
import { SchoolNav } from '@/components/navbar/schoolNav'
import { LanguagesProps } from '@/types/pages'
import React from 'react'

const SchoolLayout = ({
    params : {lang} , children
} : LanguagesProps) => {
  return (
    <section>
      <SchoolNav lang={lang}/>
        <SchoolMenu lang={lang}>
                {children}
        </SchoolMenu>
    </section>
  )
}

export default SchoolLayout
