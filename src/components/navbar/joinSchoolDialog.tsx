import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog'
import { useTheme } from '@/hooks/useTheme';

interface props {
    TJoin : string;
}

export const JoinSchoolDialog = ({
    TJoin
} : props) => {
    const theme = useTheme();
  return (
    <AlertDialog>
        <AlertDialogTrigger className='btn btn-ghost w-full btn-sm justify-start'>
            {TJoin}
        </AlertDialogTrigger>
        <AlertDialogContent className={theme}>
            join school
        </AlertDialogContent>
    </AlertDialog>
  )
}
