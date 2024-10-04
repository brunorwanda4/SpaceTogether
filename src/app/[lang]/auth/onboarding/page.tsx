import { Logo } from "@/components/navbar/Logo"
import { Skeleton } from "@/components/ui/skeleton"

const OnboardingPage = () => {
  return (
    <div className=" w-full min-h-screen justify-center flex  items-center">
      <div className=" bg-base-300 card h-fit p-4 shadow-lg">
        <div className=" flex flex-col gap-2 justify-center items-center">
          <Logo title/>
          <div className=" skeleton h-6 w-52 bg-white/20" />
        </div>
        <div className=" flex mt-2 gap-4">
          <div>
            <div className=" skeleton bg-white/20 h-4 w-60"/>
            <div className=" flex mt-2 gap-3">
              <div className=" size-16 skeleton rounded-full bg-white/20"/>
              <div className=" size-16 skeleton bg-white/20 rounded-full"/>
              <div className=" size-16 bg-white/20 skeleton rounded-full"/>
            </div>
          </div>
          <div className=" bg-base-200 flex gap-2 card p-4 ">
            <div className=" flex flex-col gap-2">
              <span className=" h-3 skeleton w-52 bg-white/20"/>
              <span className=" h-12 skeleton w-80 bg-white/20"/>
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" h-3 skeleton w-52 bg-white/20"/>
              <span className=" h-12 skeleton w-80 bg-white/20"/>
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" h-3 skeleton w-52 bg-white/20"/>
              <span className=" h-12 skeleton w-80 bg-white/20"/>
            </div>
            <span className=" h-10 skeleton w-full bg-white/20"/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OnboardingPage