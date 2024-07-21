import { SchoolMenu } from '@/components/menu/schoolMenu'
import { SchoolNav } from '@/components/navbar/schoolNav'
import { Locale } from '@/i18n'
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
      <SchoolMenu
        lang={lang}
      >
          {children}
      </SchoolMenu>
    </section>
  )
}

export default SchoolLayout
