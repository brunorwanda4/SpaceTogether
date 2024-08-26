import { cn } from "@/lib/utils";
import { JoinSchoolForm } from "../forms/school/JoinSchoolForm"
import { MyAlertDialog } from "../ui/my-components"

interface JoinSchoolDialogProps {
  email : string | null | undefined;
  className ?: string;
}

export const JoinSchoolDialog = ({
  email, className
} : JoinSchoolDialogProps) => {
  return (
    <MyAlertDialog classname={cn(" btn btn-sm btn-info", className)} icon={"Join school"}>
        <div className="">
          <h2 className=" font-bold">School code</h2>
          <JoinSchoolForm email={email}/>
        </div>
    </MyAlertDialog>
  )
}