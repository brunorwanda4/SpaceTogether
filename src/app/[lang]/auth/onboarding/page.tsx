import { Logo } from "@/components/navbar/Logo"
import { Skeleton } from "@/components/ui/skeleton"

const OnboardingPage = () => {
  return (
    <div className=" w-full h-screen justify-between flex">
      <div className=" w-1/2 h-screen grid place-content-center p-6">
        <div className=" line items-center">
        <div className=' flex justify-center mb-4'>
                <Logo title link className=' z-[99]'/>
            </div>
          <div className=" skeleton w-80 h-8"/>
          <div className=" bg-base-300 shadow-lg rounded-xl h-80 md:w-[32rem] mt-4 p-5">
            <div className=" bg-base-100 w-full h-full p-2 rounded-lg ">
              <div className=" grid grid-cols-2 gap-4">
                {/* line one */}
                <div>
                  <div className=" h-4 w-32 skeleton"/>
                  <div className=" skeleton h-8 w-full mt-2"/>
                </div>
                <div>
                  <div className=" h-4 w-32 skeleton"/>
                  <div className=" skeleton h-8 w-full mt-2"/>
                </div>
                <div>
                  <div className=" h-4 w-32 skeleton"/>
                  <div className=" skeleton h-8 w-full mt-2"/>
                </div>
                <div>
                  <div className=" h-4 w-32 skeleton"/>
                  <div className=" skeleton h-8 w-full mt-2"/>
                </div>
                <div>
                  <div className=" h-4 w-32 skeleton"/>
                  <div className=" skeleton h-8 w-full mt-2"/>
                </div>
                <div>
                  <div className=" h-4 w-32 skeleton"/>
                  <div className=" skeleton h-8 w-full mt-2"/>
                </div>
              </div>
              {/* button */}
              <div className=" skeleton w-full h-10 mt-5"/>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-1/2 relative">
        <div className="absolute left-0 bottom-0 inset-x-0 h-full w-32 bg-gradient-to-l pointer-events-none select-none from-transparent to-base-100 max-md:opacity-0 z-40" />
        <div className=" h-full skeleton "/>
      </div>
    </div>
  )
}

export default OnboardingPage