import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface Props {
  schoolUsername: string;
  schoolId : string | unknown;
}

export const ExploreJoinSchoolDialog = ({
  schoolId , schoolUsername
} : Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className=' btn btn-success btn-sm shadow-lg'>
        Join school
      </AlertDialogTrigger>
      <AlertDialogContent>
        hello bruno rwanda join school
      </AlertDialogContent>
    </AlertDialog>
  )
}
