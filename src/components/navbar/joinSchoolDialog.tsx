import { MyAlertDialog } from "../ui/my-components"

export const JoinSchoolDialog = () => {
  return (
    <MyAlertDialog classname=" btn btn-sm btn-info" icon={"Join school"}>
        <div className=" min-h-80">
          <h2 className=" font-bold">School</h2>
        </div>
    </MyAlertDialog>
  )
}