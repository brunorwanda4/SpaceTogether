import { ISchool } from "@/types/school"
import { AddSchoolTrainingSettingDialog } from "./AddSchoolTrainingSettingDialog"
import { AddClassDialogSettingSchool } from "./addClassDialogSettingSchool"
import { IoIosWarning } from "react-icons/io"
import { Locale } from "@/i18n"

interface props {
  school : ISchool
  lang : Locale
}
const SchoolAboutTrainingSetting = ({
  school , lang
} : props) => {
  return (
    <div className="card w-full bg-base-300 min-h-80 shadow-lg p-2">
      <div className=" flex justify-between">
        <h3 className="text-xl font-bold lg:text-xl">Training Setting </h3>
        <AddSchoolTrainingSettingDialog school={school} />
      </div>
      <p className=" text-gray-500">The training it show all class for school have you can add class all remove.</p>
      <div className=" line mt-2">
      {school.type.map((items) => {
        return (
          <div key={items}>
            <div className=" flex justify-between">
              <h4 className=" font-semibold flex gap-2">
                <span className=" capitalize">{items}</span>
                <span>School</span>
              </h4>
              <AddClassDialogSettingSchool lang={lang} school={school} name={items}/>
            </div>
            <div>
              <div className=" flex gap-2 mt-2">
                <span className=" badge badge-outline">L3 SOD A <span className=" badge badge-sm">27</span></span>
                <span className="  badge badge-outline">L3 SOD B <span className=" badge badge-sm">32</span></span>
              </div>
            </div>
          </div>
        )
      })}
      </div>
      <p className=" mt-2 flex items-center gap-2 text-gray-500"><IoIosWarning/>If you delete class it will take 1 week to delete it!</p>
    </div>
  )
}

export default SchoolAboutTrainingSetting
