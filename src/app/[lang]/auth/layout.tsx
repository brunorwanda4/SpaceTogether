import { AuthNav } from '@/components/navbar/authNav'
import { getDictionary } from '@/lib/dictionary'
import { LanguagesProps } from '@/types/pages'
import React from 'react'

const layout = ({children , params : {lang}} : LanguagesProps) => {
  return (
    <section className=" px-2 max-lg:px-1">
        <AuthNav lang={lang}/>
        {children}
    </section>
  )
}

export default layout