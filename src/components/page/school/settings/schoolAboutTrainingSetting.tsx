import { ISchool } from "@/types/school"
import { AddClassDialogSettingSchool } from "./addClassDialogSettingSchool"
import { IoIosWarning } from "react-icons/io"
import { Locale } from "@/i18n"
import Link from "next/link"

interface props {
  school : ISchool
  lang : Locale
  username: string
}
const SchoolAboutTrainingSetting = ({
  school , lang , username
} : props) => {
  return (
    <div className="card w-full bg-base-300 min-h-80 shadow-lg p-2">
      <div className=" flex justify-between">
        <h3 className="text-xl font-bold lg:text-xl">Training Setting </h3>
        <AddClassDialogSettingSchool lang={lang} school={school} />
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
      <div className=" justify-end flex">
      <Link className=" btn btn-sm " href={`/${lang}/s/${username}/se/cl`}>Show more classes settings</Link>
      </div>
    </div>
  )
}

export default SchoolAboutTrainingSetting
