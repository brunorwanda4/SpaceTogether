import { AuthNav } from '@/components/navbar/authNav'
import { LanguagesProps } from '@/types/pages'
import React from 'react'

const layout = ({children , params : {locale}} : LanguagesProps) => {
  return (
    <section className=" px-2 max-lg:px-1">
        <AuthNav lang={locale}/>
        {children}
    </section>
  )
}

export default layout