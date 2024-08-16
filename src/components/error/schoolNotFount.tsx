import { Locale } from '@/i18n'
import { MyImage } from '../style/myImage'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'

interface props {
    lang : Locale
    schoolUsername : string
}

const SchoolNotFount = ({
    lang , schoolUsername
} : props) => {
  return (
    <div className=' place-content-center grid size-full'>
        <div>
          <MyImage className=' size-96' src='/notFound.svg'/>
        </div>
        <div className=' flex flex-col gap-2 items-center justify-center'>
          <h1 className=' font-bold text-2xl'>Oops! School not found</h1>
          <p>We couldn{`'`}t find a school with the username <span className=' text-error font-semibold'>{schoolUsername}</span></p>
          <div>
            <Link className=' btn btn-info group/linkBack' href={`/${lang}/s`}>
              <FaArrowLeftLong className='group-hover/linkBack:scale-x-110 duration-200'/> Back on home page
            </Link>
          </div>
        </div>
      </div>
  )
}

export default SchoolNotFount
