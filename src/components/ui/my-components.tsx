"use client";

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "./alert-dialog";

interface props {
    icon ?: React.ReactNode
    children : React.ReactNode
    className?: string
    classname ?: string
}

export const MyAlertDialog = ({
    icon , children , className , classname
} : props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className={classname}>
                {icon}
            </AlertDialogTrigger>
            <AlertDialogContent className={className}>
                {children}
            </AlertDialogContent>
        </AlertDialog>
    )
}