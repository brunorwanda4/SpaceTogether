"use client";

import { useTheme } from "@/hooks/useTheme";
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
    const theme = useTheme();
    return (
        <AlertDialog>
            <AlertDialogTrigger className={classname}>
                {icon}
            </AlertDialogTrigger>
            <AlertDialogContent data-theme={theme} className={className}>
                {children}
            </AlertDialogContent>
        </AlertDialog>
    )
}