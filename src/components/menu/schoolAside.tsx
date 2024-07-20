"use client";

import { Locale } from "@/i18n"
import { SchoolAsidePublic, ShoolAsideProps } from "./schoolAsidePublic"
import { SchoolAsideMain } from "./schoolAsideMain";
import { useParams } from "next/navigation";
import { SchoolAsideInfo } from "./schoolAsideInfo";
import { useEffect, useState } from "react";
import { SPLine } from "../style/simpleComponents/line";
import { getSchoolByUsername } from "@/server/getData";
import { ISchool, TSchoolWithUser } from "@/types/school";

interface Props{
    lang : Locale
    ShoolAsideProps : ShoolAsideProps
    TSetting :string
    TMessages : string
    TId : string | null | undefined
    Schools : TSchoolWithUser[]
}

export const SchoolAside = ({
    lang , ShoolAsideProps , TSetting , TMessages , TId , Schools
} : Props) => {
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
        <SchoolAsideInfo 
          lang={lang}
          schools={Schools}
          schoolUsername={schoolUsername}
        /> 
        <SPLine />
        <SchoolAsideMain lang={lang} TSetting={TSetting} TMessages={TMessages}/>
    </div>
  )
}
