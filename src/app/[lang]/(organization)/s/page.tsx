import { auth} from '@/auth'
import { CreateSchoolDialog } from '@/components/navbar/createSchoolDialog';
import { SchoolGetSchool } from '@/components/page/school/SchoolGetStart';
import { MyImage } from '@/components/style/myImage';
import { FindSchoolByOwn } from '@/data/getSchool';
import { getUserById } from '@/data/getUserData';
import { getDictionary } from '@/lib/dictionary';
import { cn } from '@/lib/utils';
import { LanguagesProps } from '@/types/pages';
import { ISchool, TSchoolWithUser } from '@/types/school';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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

  const findSchool: ISchool[] | null = await FindSchoolByOwn(user.user.id)

  if(!findSchool) {
     return (
      <div className=' grid place-content-center min-h-[80vh] pb-12'>
      <div className=' flex justify-center h-full  school-center'>
      <div className=' flex flex-col  school-center  justify-center  w-full h-full'>
        <p>{page.school.welcome}</p>
        <SchoolGetSchool/>
        <div className=' flex gap-2 mt-2'>
          <Link href={`/${lang}/s/c`} className='btn btn-sm btn-info font-medium'>Join School</Link>
          <Link href={`/${lang}/s/e`} className='btn btn-sm btn-warning font-medium'>Explorer schools</Link>
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

  // @ts-ignore
  const schoolsWithUser: TSchoolWithUser[] = await Promise.all(findSchool.map(async (schoolDoc) => {
    const school = schoolDoc.toObject() as ISchool; // Convert to plain object
    const createdBy = await getUserById(school.createdBy.toString());
    return { ...school, createdBy };
  }));

  return (
    <div>
       <div className=' grid grid-cols-3 gap-3'>
        {schoolsWithUser.map((school) => {
          return (
            <div key={school.id} className=' card size-80 flex flex-col relative glass '>
              <MyImage src='/images/1.jpg' className=' w-full cursor-pointer' classname=' rounded-b-none'/>
              <div className=' top-0 bg-black/60 absolute h-32 z-10 w-full'/>
              <div className=' absolute  z-20 flex top-24 left-2 flex-col  flex-wrap'>
                <div className=' flex gap-2'>
                <Link href={`/${lang}/s/${school.username}`}><MyImage src={school.logo} className=' size-16' classname=' rounded-full' alt={school.name}/></Link>
                <div className=' flex flex-col gap-2'>
                  <h3 className=' font-allura font-semibold text-xl capitalize leading-5'>{school.name}</h3>
                  <Link className=' link-hover link' href={`/${lang}/s/${school.username}`}>
                    <span className=' text-info'>@</span>
                    {school.username}
                  </Link>
                </div>
                </div>
                  {/* deception */}
                  <p className=' leading-3 pt-2'>{school.description}</p>
              </div>
              {/* created by */}
              <div className=' absolute bottom-2 right-2'>
                <Link className=' flex items-center gap-1 btn btn-ghost' href={`/${lang}/p/${school.createdBy?._id}`}>
                  <div className=' flex flex-col'>
                    <span className=' font-semibold text-sm'>{school.createdBy?.name}</span>
                    <span className=' text-end text-xs font-medium'>directer</span>
                  </div>
                  <MyImage className=' size-10' classname=' rounded-full' src={!!school.createdBy?.image ? school.createdBy.image : "/p.jpg"}/>
                </Link>
              </div>
            </div>
          )
        })}
       </div>
    </div>
  )
}

export default SchoolPage