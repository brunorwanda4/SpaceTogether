import { Locale } from '@/i18n'
import AskCreateSchoolChildrenDialog from './askCreateSchoolChildrenDialog'
import { ISchool } from '@/types/school'
import { MyImage } from '@/components/style/myImage'
import { PiStudentDuotone } from "react-icons/pi";
import SchoolUpdateInfoSettingDialog from './SchoolUpdateInfoSettingDialog'
import SchoolDeleteSettingDialog from './SchoolDeleteSettingDialog'
import { auth } from '@/auth';
import Link from 'next/link';
import UpdateSchoolContact from './updateSchoolContact';
import { redirect } from 'next/navigation';

interface props {
    lang : Locale
    username : string
    school : ISchool
}

const SchoolInfoSettings = async ({
    lang, username , school
} : props) => {
  const user = (await auth())?.user
  if (!user) return redirect(`/${lang}/`);
  if(!school) return redirect(`/${lang}/s`);
  const schoolPathnameSettings = `/${lang}/s/${school.username}/se`;
  return (
    <div className=' flex gap-4 flex-col'>
      <div className='  flex justify-between w-full items-center'>
        <div>
          <h3 className='text-xl font-bold lg:text-2xl'>School information settings</h3>
        </div>
        <AskCreateSchoolChildrenDialog />
      </div>
      {/* school information */}
      <div className=' card w-full bg-base-300 min-h-80 shadow-lg p-2'>
        {/* school logo */}
        <div className=' justify-between flex items-center'>
            <div className=' flex gap-3 items-center'>
                <div className='flex gap-2 items-center'>
                  <MyImage className=' size-14' classname='object-contain' src={school.logo}/>
                  <div className=' flex flex-col'>
                      <span className=' text-lg font-semibold'>{school.name}</span>
                      <span className='text-sm'><span className=' text-info'>@</span>{school.username}</span>
                  </div>
                </div>
                <div className=' flex gap-2'>
                  {school.type.map((types) => {
                      return (
                          <span key={types} className='badge badge-outline'>{types}</span>
                      )
                  })}
                </div>
            </div>
            <div className=' flex gap-2'>
                <SchoolUpdateInfoSettingDialog  id={school._id} username={username} lang={lang} school={school}/>
                <SchoolDeleteSettingDialog school={school} id={school._id} username={username} lang={lang}/>
            </div>
        </div>
        {/* school school other information */}
        <div className=' mt-2 flex gap-2 w-full'>
          {/* school data student , teacher , staff */}
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-figure text-accent">
               <PiStudentDuotone size={25}/>
              </div>
              <div className="stat-title">Total Students</div>
              <Link href={`${schoolPathnameSettings}/stu`} className="stat-value">2.4K</Link>
              <div className="stat-desc">549 more than this Year</div>
            </div>

            <div className="stat">
              <div className="stat-figure">
                {/* avatar for teachers  */}
                <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
                   {/* total teachers */}
                   <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                      <span>43</span>
                    </div>
                  </div>
                  {/* teacher one */}
                  <div className="avatar  ">
                    <div className="w-14 rounded-full">
                      <MyImage src='/images/1.jpg'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat-title">Total Teachers</div>
              <Link href={`${schoolPathnameSettings}/tea`} className="stat-value w-auto">200</Link>
              <div className="stat-desc">43 more than this Year</div>
            </div>

            <div className="stat">
              <div className="stat-figure">
              <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
                  {/* total teachers */}
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                      <span>12</span>
                    </div>
                  </div>
                  {/* teacher one */}
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <MyImage src='/images/1.jpg'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat-title">Total Staffs</div>
              <Link href={`${schoolPathnameSettings}/st`} className="stat-value">86</Link>
              <div className="stat-desc">12 this year</div>
            </div>
          </div>
        </div>
        {/* other info owen of school and location */}
        <div className=' mt-2 flex gap-2'>
          <div className=' flex flex-col gap-2'>
            <div className=' stats shadow w-fit'>
              <div className="stat">
                <div className="stat-figure">
                <div className='avatar-group -space-x-6 rtl:space-x-reverse'>                 
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                      <span>3</span>
                    </div>
                  </div>
                  <div className="avatar  ">
                    <div className="w-14 rounded-full">
                      <MyImage src={user.image}/>
                    </div>
                  </div>
                </div>
                </div>
                <div className="stat-title">Directer</div>
                <div className="stat-value">3</div>
                <div className="stat-desc">3 from 2024</div>
              </div>
            </div>
            {/* school created by */}
            <div className=' stats shadow w-full'>
              <div className=' stat'>
              <div className="stat-figure">
              <div className="avatar  ">
                <div className="w-14 rounded-full">
                  <MyImage src={user.image}/>
                </div>
              </div>
                </div>
                <div className="stat-title">Created by</div>
                <div className="stat-value">2024</div>
                <div className="stat-desc">2 days ago</div>
              </div>
            </div>
          </div>

          {/* school description and location*/}
          <div className=' stats shadow w-full'>
            <div className="stat">
            <div className=' flex items-center justify-between '>
              <div className=' mt-2 flex gap-2'>
                  <h4 className='capitalize font-bold'>location : </h4>
                  <div className=' flex gap-1'>
                      <span>{school.country}</span>
                      <span>-</span>
                      <span>{school.province}</span>
                      <span>-</span>
                      <span>{school.city}</span>
                  </div>
              </div>
              {/* TODO : add map dialog */}
              {/* <AddMapDialogSettingSchool lang={lang} id={school._id}/> */}
            </div>
              <div className=' mt-2 flex gap-2  flex-col'>
                <div className=' flex justify-between items-center'>
                  <h4 className='  capitalize font-semibold '>contacts :</h4>
                  <UpdateSchoolContact school={school} lang={lang}/>
                </div>
                <div className=' flex  justify-between'>
                  <div className=' flex flex-col gap-2'>
                      <div className=' flex gap-2'>
                          <span className=' text-gray-500 font-medium '>Phone number :</span>
                          <span>{school.phoneNumber}</span>
                      </div>
                      <div className=' flex gap-2'>
                          <span className=' text-gray-500 font-medium  capitalize'>email:</span>
                          <span className=' cursor-pointer' >{school.email}</span>
                      </div>
                    <div className=' flex gap-2'>
                      <span className=' text-gray-500 font-medium  capitalize'>Website:</span>
                      <Link href={school.websiteURL}  target="_blank" rel="noopener noreferrer" className=' link link-hover'>{school.websiteURL}</Link>
                    </div>
                  </div>
                  {/* other account */}
                  <div className=' flex flex-col gap-2'>
                    {!!school.whatsapp && (
                      <div className=' flex gap-2'>
                      <div className=' flex justify-between items-center gap-1'>
                        <MyImage className=' size-5' src={"/icons/whatsapp.png"}/>
                        <span className=' text-gray-500 font-medium  capitalize'>whatsapp :</span>
                      </div>
                      <span className=' cursor-pointer' >{school.whatsapp}</span>
                    </div>
                    )}
                    {!!school.facebook && (
                      <div className=' flex gap-2'>
                        <div className=' flex justify-between items-center gap-1'>
                          <MyImage className=' size-5' src={"/icons/facebook.png"}/>
                          <span className=' text-gray-500 font-medium  capitalize'>facebook:</span>
                        </div>
                        <span className=' cursor-pointer' >{school.facebook}</span>
                      </div>
                    )}
                   {!!school.twitter && (
                     <div className=' flex gap-2'>
                     <div className=' flex justify-between items-center gap-1'>
                       <MyImage className=' size-5' src={"/icons/twitter.png"}/>
                       <span className=' text-gray-500 font-medium  capitalize'>twitter (x):</span>
                     </div>
                     <span className=' cursor-pointer' >{school.twitter}</span>
                    </div>
                   )}
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolInfoSettings