import { AuthNav } from '@/components/navbar/authNav'
import { getDictionary } from '@/lib/dictionary'
import { LanguagesProps } from '@/types/pages'
import React from 'react'

const Layout = async ({children , params : {lang}} : LanguagesProps) => {
  const {nav} = await getDictionary(lang)
  return (
    <section className=" w-full bg-grid- bg-grid-small">
        <AuthNav
         lang={lang}
         TCancel={nav.auth.settingDialog.chooseLanguage.cancel}
         TSave={nav.auth.settingDialog.chooseLanguage.save}
         TSetting={nav.auth.settingDialog.setting}
         TTLanguage={nav.auth.settingDialog.language}
         title={nav.auth.settingDialog.changeTheme}
         chooseLang={nav.auth.settingDialog.chooseLanguage.changeLanguage}
        />
        {children}
    </section>
  )
}

export default Layout