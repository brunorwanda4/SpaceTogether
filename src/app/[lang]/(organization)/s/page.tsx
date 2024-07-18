import { auth} from '@/auth'
import { SchoolGetSchool } from '@/components/page/school/SchoolGetStart';
import { getDictionary } from '@/lib/dictionary';
import { LanguagesProps } from '@/types/pages';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BsPlusCircle } from 'react-icons/bs';

export const metadata:Metadata = {
  title : "Schools"
}

const SchoolPage =async ({
  params : {lang}, 
} : LanguagesProps) => {
  const user = await auth();

  if(!user) {
    redirect(`/${lang}`)
  }

  const {page} = await getDictionary(lang)

  return (
    <div className=' grid place-content-center h-[80vh] pb-12'>
      <div className=' flex justify-center h-full  items-center'>
      <div className=' flex flex-col  items-center  justify-center  w-full h-full'>
        <p>{page.school.welcome}</p>
        <SchoolGetSchool/>
        <div className=' flex gap-2 mt-2'>
          <Link href={`/${lang}/s/c`} className='btn btn-sm btn-info font-medium'>Join School</Link>
          <Link href={`/${lang}/s/c`} className='btn btn-sm btn-ghost text-info font-medium'>Add School</Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SchoolPage
