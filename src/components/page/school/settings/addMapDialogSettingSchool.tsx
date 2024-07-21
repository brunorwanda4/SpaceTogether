"use client"

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from '@/hooks/useTheme'
import { Locale } from '@/i18n'
import { BsPlus } from 'react-icons/bs'

interface props {
    lang : Locale
    id : string | unknown
}

const AddMapDialogSettingSchool = ({
    lang , id
} : props) => {
    const theme = useTheme()
  return (
    <Dialog>
      <DialogTrigger className=' btn btn-sm btn-ghost btn-outline'>
        <BsPlus size={20}/><span>add school google map</span>
      </DialogTrigger>
      <DialogContent data-theme={theme}>
        {/* TODO: to add google map */}
        add school google map
      </DialogContent>
    </Dialog>
  )
}

export default AddMapDialogSettingSchool
