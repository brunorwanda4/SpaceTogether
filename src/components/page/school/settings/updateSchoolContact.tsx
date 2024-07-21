"use client";

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from '@/hooks/useTheme';
import { Locale } from '@/i18n'
import { BsPlus } from 'react-icons/bs';

interface props {
    lang : Locale
}

const UpdateSchoolContact = ({
    lang
} : props) => {
    const theme = useTheme();
  return (
    <Dialog>
      <DialogTrigger className='btn btn-sm btn-ghost btn-outline'>
        <BsPlus size={20}/><span>Update contact</span>
      </DialogTrigger>
      <DialogContent data-theme={theme}>
        add school contact
      </DialogContent>
    </Dialog>
  )
}

export default UpdateSchoolContact
