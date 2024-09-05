import OnboardingForm from "@/components/auth/form/onboardingForm"
import { Logo } from "@/components/navbar/Logo"
import { useTheme } from "@/hooks/useTheme";
import { Locale } from "@/i18n"
import { cn } from "@/lib/utils";

interface props {
  params : {
    lang : Locale,
    onboardingUserId : string
  }
}
const OnboardingPage = ({
  params : {lang , onboardingUserId}
} : props) => {
  return (
    <div className={cn("min-h-screen w-full medium-grid-bg bg-fixed place-content-center grid")}>
      <div className=" min-h-96 min-w-96 bg-base-300 rounded-xl shadow-xl p-2 md:p-4">
        <div className=" flex justify-center"><Logo title /></div>
        <div className=" rounded-xl p-4 mt-2 bg-base-200">
          <OnboardingForm />
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
