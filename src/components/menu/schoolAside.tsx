"use client";

import { Locale } from "@/i18n"
import { SchoolAsidePublic, ShoolAsideProps } from "./schoolAsidePublic"
import { SchoolAsideMain } from "./schoolAsideMain";
import { useParams } from "next/navigation";
import { SchoolAsideInfo } from "./schoolAsideInfo";
import { SPLine } from "../style/simpleComponents/line";
import { TSchoolWithUser } from "@/types/school";

export interface SchoolAsideProps{
    lang : Locale
    ShoolAsideProps : ShoolAsideProps
    TSetting :string
    TMessages : string
    TId : string | null | undefined
    Schools : TSchoolWithUser[] | undefined
}

export const SchoolAside = ({
    lang , ShoolAsideProps , TSetting , TMessages , TId , Schools
} : SchoolAsideProps) => {
  const {schoolUsername} = useParams() as { schoolUsername: string };

  return (
    <div className=" flex overflow-y-auto max-h-screen flex-col h-screen">
        {/* public route */}
        <SchoolAsidePublic
          TClub={ShoolAsideProps.TClub}
          TFamily={ShoolAsideProps.TFamily}
          TGroup={ShoolAsideProps.TGroup}
          THome={ShoolAsideProps.THome}
          lang={lang}
        />
        {!!Schools && (
          <SchoolAsideInfo 
          lang={lang}
          schools={Schools}
          schoolUsername={schoolUsername}
        /> 
        )}
        <SPLine />
        <SchoolAsideMain lang={lang} TSetting={TSetting} TMessages={TMessages}/>
    </div>
  )
}
