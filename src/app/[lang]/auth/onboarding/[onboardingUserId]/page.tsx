"use client";
import {OnboardingForm} from "@/components/auth/form/onboardingForm"
import { Logo } from "@/components/navbar/Logo"
import { MyImage } from "@/components/style/myImage";
import { useTheme } from "@/hooks/useTheme";
import { Locale } from "@/i18n"
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface props {
  params : {
    lang : Locale,
    onboardingUserId : string
  }
}

const OnboardingPage = ({
  params : {lang , onboardingUserId}
} : props) => {
  const theme= useTheme();
  return (
    <div className={cn("min-h-screen flex gap-2 max-md:relative justify-between " )}>
        <section className=' w-full items-center justify-center flex min-h-screen'>
          <div className=' bg-base-300  card p-4 shadow-lg'>
            <div className=' flex justify-center mb-4'>
                <Logo title link className=' z-[99]'/>
            </div>
            <main className="  bg-base-200 p-4 card">
              <div className="">
                <OnboardingForm id={onboardingUserId}/>
              </div>
          </main>
          </div>
        </section>
    </div>
  )
}

export default OnboardingPage
