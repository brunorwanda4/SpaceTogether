"use client";

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from '@/hooks/useTheme'
import { Locale } from '@/i18n'
import { BsTrash } from 'react-icons/bs'
import {} from "react-icons/fa"
import { FaTrash, FaTrashCan } from 'react-icons/fa6';

interface props {
    lang : Locale
    username : string
    id : string | unknown
}
const SchoolDeleteSettingDialog = ({
    lang , username , id
} : props) => {
    const theme = useTheme()
  return (
    <Dialog>
    <DialogTrigger className=' btn btn-ghost btn-sm flex gap-2 btn-square'>
      <FaTrashCan size={20}/>
      <span className=' sr-only'>delete school</span>
    </DialogTrigger>
    <DialogContent data-theme={theme}>
      {/* TODO : make dialog for delete school */}
      delete school info
    </DialogContent>
  </Dialog>
  )
}

export default SchoolDeleteSettingDialog
