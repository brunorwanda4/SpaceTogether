import { MyImage } from "@/components/style/myImage";
import { Locale } from "@/i18n";
import { ISchool } from "@/types/school"
import Link from "next/link";

interface props {
    school : ISchool;
    lang : Locale
}
const ExploreAskToJoin = ({
    school , lang
} : props) => {
  return (
    <div className=" flex  justify-between w-full">
      <div className=" flex items-center gap-2">
        <MyImage src={school.logo} className=" size-14" classname=" object-contain"/>
        <div className=" flex flex-col gap-1 ">
            <h3 className=" text-lg font-bold">{school.name}</h3>
            <span className="  font-semibold text-sm"><span className=" text-neutral">@</span>{school.username}</span>
        </div>
      </div>
      {/* combination  */}
      <div className=" flex flex-col gap-2 items-center">
        <h5 className=" font-semibold">Combination</h5>
        <div className=" flex gap-2">
            {school.type.map((type) => {
                return (
                    <span className=" badge badge-outline" key={type}>
                        {type}
                    </span>
                )
            })}
        </div>
      </div>
      {/* main contact */}
      <div className=" flex gap-2">
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
  )
}

export default ExploreAskToJoin
