"use client";

import UpdateSchoolContactForm from '@/components/forms/settings/UpdateSchoolContactForm';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useTheme } from '@/hooks/useTheme';
import { Locale } from '@/i18n';
import { ISchool } from '@/types/school';
import { BsPlus } from 'react-icons/bs';

interface props {
    lang : Locale
    school : ISchool
}

const UpdateSchoolContact = ({
    lang ,school
} : props) => {
    const theme = useTheme();
  return (
    <AlertDialog>
      <AlertDialogTrigger className='btn btn-sm btn-ghost btn-outline'>
        <BsPlus size={20}/><span>Update contact</span>
      </AlertDialogTrigger>
      <AlertDialogContent data-theme={theme}>
        <AlertDialogTitle>
          Update school contact
        </AlertDialogTitle>
        <UpdateSchoolContactForm school={school}/>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateSchoolContact
