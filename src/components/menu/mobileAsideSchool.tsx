"use client";

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"
import { SchoolAside, SchoolAsideProps } from "./schoolAside"
import { Locale } from "@/i18n"
import { ShoolAsideProps } from "./schoolAsidePublic";
import { useTheme } from "@/hooks/useTheme";
import { Logo } from "../navbar/Logo";

interface props {
    lang : Locale
    SchoolAsideProps : SchoolAsideProps
    ShoolAsideProps : ShoolAsideProps
}

export const MobileAsideSchool = ({
    lang , SchoolAsideProps, ShoolAsideProps
} : props) => {
    const theme = useTheme();
  return (
    <Sheet>
        <SheetTrigger className=" md:hidden btn btn-ghost max-md:flex hidden btn-sm btn-circle">
            <Menu size={20}/>
        </SheetTrigger>
        <SheetContent data-theme={theme} side={"left"}>
            <SheetTitle className=" pb-4">
                <Logo title/>
            </SheetTitle>
            <SchoolAside
                ShoolAsideProps={ShoolAsideProps}
                lang={lang}
                TSetting = {SchoolAsideProps.TSetting}
                TId = {SchoolAsideProps.TId}
                TMessages = {SchoolAsideProps.TMessages}
                Schools={SchoolAsideProps.Schools}
            />
        </SheetContent>
    </Sheet>
  )
}
