"use client";

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from '@/hooks/useTheme'
import { Locale } from '@/i18n'
import { BsPlus } from 'react-icons/bs'

interface props {
    lang : Locale
    username : string
}

const AskCreateSchoolChildrenDialog = () => {
    const theme = useTheme()
  return (
    <Dialog>
      <DialogTrigger className=' btn btn-outline btn-sm flex gap-2'>
        <BsPlus size={20}/>
        <span>Add school relationship</span>
      </DialogTrigger>
      <DialogContent data-theme={theme}>
        {/* TODO : to make relation ship for other school */}
        add new school relationship
      </DialogContent>
    </Dialog>
  )
}

export default AskCreateSchoolChildrenDialog
