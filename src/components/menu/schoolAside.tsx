import { Locale } from "@/i18n"
import { SchoolAsidePublic, ShoolAsideProps } from "./schoolAsidePublic"
import { SchoolAsideMain } from "./schoolAsideMain"

interface Props{
    lang : Locale
    ShoolAsideProps : ShoolAsideProps
    TSetting :string
    TMessages : string
}

export const SchoolAside = ({
    lang , ShoolAsideProps , TSetting , TMessages
} : Props) => {
  return (
    <div className=" flex flex-col gap-1 ">
        {/* public route */}
        <SchoolAsidePublic
          TClub={ShoolAsideProps.TClub}
          TFamily={ShoolAsideProps.TFamily}
          TGroup={ShoolAsideProps.TGroup}
          THome={ShoolAsideProps.THome}
          lang={lang}
        />
        <SchoolAsideMain lang={lang} TSetting={TSetting} TMessages={TMessages}/>
    </div>
  )
}
