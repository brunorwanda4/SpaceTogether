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
      <div className=" flex flex-col gap-2">
          {school.type.map((items) => {
            return (
              <Accordion key={items} type="single" collapsible>
              <AccordionItem className="" value={items}>
                <AccordionTrigger className=" bg-base-200 px-2">{items}</AccordionTrigger>
                <AccordionContent className=" border-none px-2 bg-base-200">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            )
          })}
        </div>
      </div>
      <div className=" h-screen"></div>
    </div>
  )
}

export default SchoolSettingClassPage
