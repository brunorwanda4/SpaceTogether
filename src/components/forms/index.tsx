"use client";

import { IoSettingsOutline } from "react-icons/io5";
import { MyAlertDialog } from "../ui/my-components";

export const SchoolRequestSetting = () => {
    return (
        <MyAlertDialog 
         icon={<div><IoSettingsOutline size={20}/></div>} 
         classname=" btn btn-sm btn-ghost"
        >
            Hello bruno
        </MyAlertDialog>
    )
}