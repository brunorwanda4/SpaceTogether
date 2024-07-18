import { auth} from '@/auth'
import { CreateSchoolDialog } from '@/components/navbar/createSchoolDialog';
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

  const {page , nav} = await getDictionary(lang)
  const user = await auth()
  
  if(!user) {
    redirect(`/${lang}`)
  }

  return (
    <div className=' grid place-content-center h-[80vh] pb-12'>
      <div className=' flex justify-center h-full  items-center'>
      <div className=' flex flex-col  items-center  justify-center  w-full h-full'>
        <p>{page.school.welcome}</p>
        <SchoolGetSchool/>
        <div className=' flex gap-2 mt-2'>
          <Link href={`/${lang}/s/c`} className='btn btn-sm btn-info font-medium'>Join School</Link>
          <CreateSchoolDialog 
              className='btn btn-sm btn-ghost text-info font-medium w-auto'
              TCreate={nav.school.createSchool} 
              email = {user.user.email}
              TSchoolProps={{
              lang : lang,
              TCity : page.school.addSchoolFrom.city,
              TDescription : page.school.addSchoolFrom.description,
              TEmail : page.school.addSchoolFrom.email,
              TCreateBy : user.user.id,
              TPhone : page.school.addSchoolFrom.phone,
              TName : page.school.addSchoolFrom.name,
              TLocation : page.school.addSchoolFrom.location,
              TLogo : page.school.addSchoolFrom.logo,
              TProvince : page.school.addSchoolFrom.province,
              TType : page.school.addSchoolFrom.type,
              TUsername : page.school.addSchoolFrom.username,
              TWebsite : page.school.addSchoolFrom.website,
              email : user.user.email,
           }}
          />
        </div>
      </div>
      </div>
    </div>
  )
}

export default SchoolPage
