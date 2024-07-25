import { SchoolMenu } from '@/components/menu/schoolMenu'
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
      <SchoolMenu
        lang={lang}
      >
          {children}
      </SchoolMenu>
    </section>
  )
}

export default SchoolLayout
