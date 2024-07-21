"use client";

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from '@/hooks/useTheme'
import { Locale } from '@/i18n'
import { BsPen, BsPlus } from 'react-icons/bs'

interface props {
    lang : Locale
    username : string
    id : string | unknown
}
const SchoolUpdateInfoSettingDialog = ({
    lang , username , id
} : props) => {
    const theme = useTheme()
  return (
    <Dialog>
    <DialogTrigger className=' btn btn-ghost btn-sm flex gap-2 btn-square'>
      <BsPen size={20}/>
      <span className=' sr-only'>Update school info</span>
    </DialogTrigger>
    <DialogContent data-theme={theme}>
      {/* TODO : make dialog for update school info */}
      Update school info
    </DialogContent>
  </Dialog>
  )
}

export default SchoolUpdateInfoSettingDialog
