import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { ISchool } from "@/types/school"
import { BsPen, BsPlus } from "react-icons/bs"

interface props {
    school : ISchool
}

export const AddSchoolTrainingSettingDialog = ({
    school
} : props) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger className='btn btn-sm btn-ghost'>
         <BsPen/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        Add new training school
      </AlertDialogContent>
    </AlertDialog>
  )
}
