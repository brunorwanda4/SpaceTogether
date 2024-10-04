"use client";
import {OnboardingForm, OnboardingSocialMediaForm} from "@/components/auth/form/onboardingForm"
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

export type ChoosePropsOnboarding = "userData" | "socialMedia" | "school"

const OnboardingPage = ({
  params : {lang , onboardingUserId}
} : props) => {
  const theme= useTheme();
  const [choose, setChoose] = useState<ChoosePropsOnboarding>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('choose') as ChoosePropsOnboarding) || "userData";
  });

  // change page title
  // useEffect(() => {
  //   const title = window.t
  // },[]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('choose', choose);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [choose]);

  const handleChoose = (choose: ChoosePropsOnboarding) => {
    setChoose(choose)
  }


  return (
    <div className={cn("min-h-screen flex gap-2 max-md:relative justify-between " )}>
        <section className=' w-full items-center justify-center flex min-h-screen'>
          <div className=' bg-base-300  card p-4'>
            <div className=' flex justify-center mb-4'>
                <Logo title link className=' z-[99]'/>
            </div>
            <main className="  bg-base-200 p-4 card">
              <div className="">
                <OnboardingForm choose={handleChoose} id={onboardingUserId}/>
              </div>
          </main>
          </div>
        </section>
    </div>
  )
}

export default OnboardingPage
