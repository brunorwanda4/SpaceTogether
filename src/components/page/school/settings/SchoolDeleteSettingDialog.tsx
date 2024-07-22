"use client";

import { MyImage } from '@/components/style/myImage';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/useTheme'
import { Locale } from '@/i18n'
import { DeleteSchoolServer } from '@/server/s/deleteschoolServer';
import { ISchool } from '@/types/school';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { useRouter } from 'next/navigation';
import { startTransition, useTransition } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { FaTrashCan } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';

// @ts-ignore
import { BeatLoader } from 'react-spinners';

interface props {
    lang : Locale
    username : string
    id : string | unknown
    school : ISchool
}
const SchoolDeleteSettingDialog = ({
    lang , username , id , school ,
} : props) => {
    const theme = useTheme();
    const [isPending , startTransition] = useTransition();

    // router 
    const router = useRouter()

    const handleDelete = (id: string | unknown) => async () => {
        startTransition(() => {
          DeleteSchoolServer(id).then((data) => {
            if(!!data.success){
              toast({
                title : "School contact details have been updated successfully",
                description : (
                  <div className="flex gap-2">
                    <BsCheck2Circle size={20} className="  text-success"/>
                    <span>{data.success}</span>
                  </div>
                ),
              });
              router.push(`/${lang}/s`)
            } else if(!!data.error){
              toast({
                title : "Oops! Something went wrong",
                variant : "destructive",
                description : (
                  <div className="flex gap-2">
                    <IoIosWarning size={20} className="  text-error"/>
                    <span>{data.error}</span>
                  </div>
                ),
              });              
            }
          })
        });
    }
    
  return (
    <AlertDialog>
    <AlertDialogTrigger className=' btn btn-ghost btn-sm flex gap-2 btn-square hover:text-error duration-200'>
      <FaTrashCan size={20}/>
      <span className=' sr-only'>delete school</span>
    </AlertDialogTrigger>
    <AlertDialogContent data-theme={theme}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete school
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to delete this school?
      </AlertDialogDescription>
      <div className=" flex justify-end mt-2 items-center gap-2">
          <AlertDialogAction onClick={handleDelete(school._id)} type="button" className=" btn-error"> {isPending ? <BeatLoader /> : "Delete"}</AlertDialogAction>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
      </div>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default SchoolDeleteSettingDialog
