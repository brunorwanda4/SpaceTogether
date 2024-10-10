import CreatingSchoolForm from "@/components/auth/form/onboarding/creatingSchoolForm"
import { Logo } from "@/components/navbar/Logo"
import { CreateSchoolForm } from "@/components/page/school/createSchoolForm"
import { cn } from "@/lib/utils"

const DirecterAddSchoolPage = () => {
  return (
    <div className={cn("min-h-screen flex gap-2 max-md:relative justify-between " )}>
    <section className=' w-full items-center justify-center flex min-h-screen'>
      <div className=' bg-base-300  card p-4 shadow-lg'>
        <div className=' flex justify-center mb-4 flex-col gap-2 items-center'>
            <Logo title link className=''/>
            <p className=" text-sm text-gray-500">Thanks to use our application in your school, this form it help you to create you school please use real Information! </p>
            <div className=" flex justify-center"><h2 className=' text-center text-xl font-semibold leading-4  w-80 md:text-2xl'>Create school</h2></div>
        </div>
        <main className="  bg-base-200 p-4 card">
          <div className="">
            <CreatingSchoolForm />
          </div>
      </main>
      </div>
    </section>
</div>
  )
}

export default DirecterAddSchoolPage
