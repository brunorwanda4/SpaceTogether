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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('choose', choose);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [choose]);

  const handleChoose = (choose: ChoosePropsOnboarding) => {
    setChoose(choose)
  }

  const renderContent = () => {
    switch (choose) {
      case "userData" :
        return (
          <OnboardingForm choose={handleChoose} id={onboardingUserId}/>
        )
      case "socialMedia" : 
        return (
          <OnboardingSocialMediaForm choose={handleChoose} id={onboardingUserId}/>
        )
      case "school" :
        return (
          <div>
            Schools
            <button className=" btn btn-primary" onClick={() => handleChoose("socialMedia")}>back</button>
          </div>
        )
      default : 
        return (
          <OnboardingForm choose={handleChoose} id={onboardingUserId}/>
        )
    }
  }

  const renderContentTitle = () => {
    switch (choose) {
      case "userData":
        return ("Onboarding");
      case "school" :
        return ("School");
      case "socialMedia" : 
      return ("Help us to know your social accounts 🦍");
      default:
        return ("Onboarding");
    }
  }
  return (
    <div className={cn("min-h-screen flex gap-2 max-md:relative justify-between " )}>
        <section className='p-5 max-md:absolute max-md:items-center max-md:h-full max-md:justify-center max-md:top- max-md:z-40 max-md:w-full w-full'>
          <div className=' items-center justify-center max-md:h-full max-w-full max-md:flex max-md:flex-col'>
            <div className=' flex justify-center mb-4'>
                <Logo title link className=' z-[99]'/>
            </div>
            <main className={cn("max-md:card max-md:backdrop-blur-xl max-md:shadow-md max-md:min-w-96 max-md:w-full max-md:bg-black/40 max-md:border max-md:p-4 max-md:max-w-xl max-md:min-h-fit max-md:overflow-y-auto")}>
              <div className=" bg-base-300 shadow-lg rounded-xl p-4 card">
              <div className=" flex justify-center w-full"><h2 className=' text-center text-xl font-bold  w-80 md:text-2xl'>{renderContentTitle()}</h2></div>
                {renderContent()}
              </div>
          </main>
          </div>
        </section>
        <div className=' w-full relative'>
        <div className="absolute left-0 bottom-0 inset-x-0 h-full w-32 bg-gradient-to-l pointer-events-none select-none from-transparent to-base-100 max-md:opacity-0 z-40" />
          <div>
            <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/p.jpg"}/>
          </div>
        </div>
    </div>
  )
}

export default OnboardingPage
