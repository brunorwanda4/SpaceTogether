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

  // const schoolsWithUserI = await Promise.all(findSchool.map(async (school) => {
  //   const createdBy = await getUserById(school.createdBy.toString());
  //   return { ...school, createdBy };
  // }));

  return (
    <div>
       <div className=' grid grid-cols-3 gap-3'>
        {schoolsWithUser.map((school) => {
          return (
            <div key={school.id} className=' card glass size-80 flex flex-col justify-end relative'>
              <div className=' absolute  right-2 top-1/4 school-center flex justify-between w-full'>
                <div className=' pl-4'>
                  <h3 className=' font-medium text-xl  capitalize'>{school.name}</h3>
                  <Link href={`/${lang}/s/${school.username}`} className=' text-info link-hover'>@{school.username}</Link>
                </div>
                <Link href={`/${lang}/s/${school.username}`}><MyImage src={school.logo} className=' avatar size-16' classname=' rounded-full'/></Link>
              </div>
              <div className=' w-full bg-black/20 h-3/5'>
                <div className=' mt-12 px-2'>
                  <p>{school.description}</p>
                </div>
                <Link href={`/${lang}/p/${school.createdBy?._id}`} className=' flex justify-end bottom-2 absolute  right-2'>
                    <div className=' flex gap-1 items-center'>
                      <span className=' text-xs font-medium'>{school.createdBy?.name}</span>
                    <div className={cn(" avatar")}>
                          <div className=' size-7 relative rounded-full'>
                            <Image src={!!school.createdBy?.image ? school.createdBy?.image : "/p.jpg"} alt={cn("your user name :" , school.createdBy?.name)} fill priority/>
                          </div>
                      </div>
                    </div>
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