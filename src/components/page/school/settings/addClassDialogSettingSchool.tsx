"use client";
import { AddClassSettingSchoolForm } from "@/components/forms/settings/addClassSettingSchoolForm"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useTheme } from "@/hooks/useTheme";
import { Locale } from "@/i18n"
import { ISchool } from "@/types/school"
import { BsPlus } from "react-icons/bs"

interface props {
    name : string,
    school : ISchool,
    lang : Locale,
}

export const AddClassDialogSettingSchool = ({
    name , school , lang
} : props) => {
    const theme = useTheme();
  return (
    <AlertDialog>
        <AlertDialogTrigger className=" btn btn-sm btn-outline">
            <BsPlus size={20}/><span><span className=" capitalize">{name}</span> classes</span>
        </AlertDialogTrigger>
        <AlertDialogContent data-theme={theme}>
            <AlertDialogTitle>
                Update training classes <span className=" font-bold capitalize">{name}</span>
            </AlertDialogTitle>
            <div>
                <AddClassSettingSchoolForm school={school} lang={lang}/>
            </div>
        </AlertDialogContent>
    </AlertDialog>
  )
}