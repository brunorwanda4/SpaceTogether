import SchoolNotFount from "@/components/error/schoolNotFount"
import { AddClassDialogSettingSchool } from "@/components/page/school/settings/addClassDialogSettingSchool"
import { CardSettingsClassName } from "@/components/style"
import { Locale } from "@/i18n"
import { cn } from "@/lib/utils"
import { getSchoolByUsername } from "@/server/getData"
import { Metadata } from "next"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
import { BsLayersFill } from "react-icons/bs"

export const metadata:Metadata = {
  title : "School Settings"
}

interface props {
    params : {schoolUsername : string , lang : Locale}
}

const SchoolSettingClassPage = async ({
  params : {schoolUsername , lang}
} : props) => {
  const school = await getSchoolByUsername(schoolUsername);
  if(!school) return <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>
  return (
    <div className=" p-2">
      <div className=" flex gap-2 items-center w-full justify-between">
        <div className=" flex gap-2 items-center">
          <BsLayersFill size={44}/>
          <h2 className=" text-2xl font-bold">Classes <span className=" badge badge-lg badge-outline ">32</span></h2>
        </div>
       <AddClassDialogSettingSchool school={school} lang={lang} />
      </div>
      <div className={cn(CardSettingsClassName , " mt-4")}>
      <div>
          {school.type.map((items) => {
            return (
              <div key={items} className="join w-full join-horizontal">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="radio" name={"my-accordion-4"} defaultChecked />
                  <div className="collapse-title text-xl font-medium">{items}</div>
                  <div className="collapse-content">
                    <p>{items}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className=" h-screen"></div>
    </div>
  )
}

export default SchoolSettingClassPage
