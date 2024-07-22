"use client";

import UpdateSchoolInfoForm from '@/components/forms/settings/updateSchoolInfoForm';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useTheme } from '@/hooks/useTheme'
import { Locale } from '@/i18n'
import { ISchool } from '@/types/school';
import { BsPen, } from 'react-icons/bs'

interface props {
    lang : Locale
    username : string
    id : string | unknown
    school : ISchool
}
const SchoolUpdateInfoSettingDialog = ({
    lang , school
} : props) => {
    const theme = useTheme()
  return (
  <AlertDialog>
    <AlertDialogTrigger className=' btn btn-ghost btn-sm flex gap-2 btn-square'>
      <BsPen size={20}/>
      <span className=' sr-only'>Update school info</span>
    </AlertDialogTrigger>
    <AlertDialogContent data-theme={theme}>
      <AlertDialogTitle>
          Update school Information
        </AlertDialogTitle>
      <UpdateSchoolInfoForm school={school} lang={lang}/>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default SchoolUpdateInfoSettingDialog
