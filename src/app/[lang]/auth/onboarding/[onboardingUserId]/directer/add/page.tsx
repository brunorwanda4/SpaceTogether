import CreatingSchoolForm from "@/components/auth/form/onboarding/creatingSchoolForm"
import { Logo } from "@/components/navbar/Logo"
import { CreateSchoolForm } from "@/components/page/school/createSchoolForm"
import { cn } from "@/lib/utils"

const DirecterAddSchoolPage = () => {
  return (
    <div className={cn("min-h-screen flex gap-2 max-md:relative justify-between " )}>
    <section className=' w-full items-center justify-center flex min-h-screen'>
      <div className=' bg-base-300  card p-4 shadow-lg'>
        <div className=' flex justify-center mb-4'>
            <Logo title link className=''/>
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
