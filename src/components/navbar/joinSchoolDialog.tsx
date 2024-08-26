import { JoinSchoolForm } from "../forms/school/JoinSchoolForm"
import { MyAlertDialog } from "../ui/my-components"

interface JoinSchoolDialogProps {
  email : string | null | undefined;
}

export const JoinSchoolDialog = ({
  email
} : JoinSchoolDialogProps) => {
  return (
    <MyAlertDialog classname=" btn btn-sm btn-info" icon={"Join school"}>
        <div className="">
          <h2 className=" font-bold">School code</h2>
          <JoinSchoolForm email={email}/>
        </div>
    </MyAlertDialog>
  )
}