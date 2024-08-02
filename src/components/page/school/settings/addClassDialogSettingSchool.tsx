"use client";
import { AddClassSettingSchoolForm } from "@/components/forms/settings/addClassSettingSchoolForm"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useTheme } from "@/hooks/useTheme";
import { Locale } from "@/i18n"
import { ISchool } from "@/types/school"
import { BsPlus } from "react-icons/bs"

interface props {
    school : ISchool,
    lang : Locale,
}

export const AddClassDialogSettingSchool = ({
    school , lang
} : props) => {
    const theme = useTheme();
  return (
    <AlertDialog>
        <AlertDialogTrigger className=" btn btn-sm btn-outline">
            <BsPlus size={20}/><span>Add new school class</span>
        </AlertDialogTrigger>
        <AlertDialogContent data-theme={theme}>
            <AlertDialogTitle>
              Add new school classes
            </AlertDialogTitle>
            <AddClassSettingSchoolForm  school={school} lang={lang}/>
        </AlertDialogContent>
    </AlertDialog>
  )
}