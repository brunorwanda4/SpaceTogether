import { Skeleton } from "@/components/ui/skeleton";

const SchoolSettingLoading = () => {
    const number = <div className="skeleton size-12 w-20"/>
    const image = <div className=" skeleton size-14 rounded-full"/>
    const smallNumber = <div className="skeleton size-4 rounded-sm w-8"/>
    const line = <div className="skeleton size-4  w-60"/>
  return (
    <div className=" min-h-screen">
        <div className=" flex  justify-between">
            <h3 className='text-xl font-bold lg:text-2xl'>School information settings</h3>
            <div className=" skeleton w-52 h-10" />
        </div>
        <div className=" card w-full bg-base-200 min-h-80 shadow-lg p-2 mt-4 ">
            {/* header */}
            <div className=" flex justify-between items-center">
                <div className=" flex gap-2 items-center">
                    {image}
                    <div className=" flex flex-col gap-1">
                        <div className=" skeleton h-6 w-32"/>
                        <div className=" skeleton h-4 w-24"/>
                    </div>
                </div>
                <div className=" flex gap-2">
                    <div className=" skeleton w-14 h-8"/>
                    <div className=" skeleton w-14 h-8"/>
                    <div className=" skeleton w-14 h-8"/>
                </div>
                <div className=" flex gap-2">
                    <div className=" skeleton size-10 rounded-sm"/>
                    <div className=" skeleton size-10 rounded-sm"/>
                </div>
            </div>
            {/* total students */}
            <div className="stats shadow w-full mt-2">
            <div className="stat">
              <div className="stat-figure text-accent">
               <div className=" skeleton size-25 "/>
              </div>
              <div className="stat-title">Total Students</div>
                {number}
              <div className="stat-desc flex gap-2">{smallNumber} more than this Year</div>
            </div>

            <div className="stat">
              <div className="stat-figure">
                {/* avatar for teachers  */}
                <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
                   {/* total teachers */}
                   <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                      {number}
                    </div>
                  </div>
                  {/* teacher one */}
                  <div className="avatar  ">
                    <div className="w-14 rounded-full">
                      <div className=" skeleton size-14 rounded-full "/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat-title">Total Teachers</div>
              <div className="skeleton size-14 w-20"/>
              <div className="stat-desc flex gap-2">{smallNumber} more than this Year</div>
            </div>

            <div className="stat">
              <div className="stat-figure">
              <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
                  {/* total teachers */}
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                      {number}
                    </div>
                  </div>
                  {/* teacher one */}
                  <div className="">
                    <div className="rounded-full">
                        {image}
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat-title">Total Staffs</div>
                {number}
              <div className="stat-desc flex gap-2 mt-1">{smallNumber} this year</div>
            </div>
          </div>
          <div className=' mt-2 flex gap-2'>
            <div className=' flex flex-col gap-2'>
                <div className=' stats shadow w-fit'>
                <div className="stat">
                    <div className="stat-figure">
                    <div className='avatar-group -space-x-6 rtl:space-x-reverse'>                 
                    <div className="avatar placeholder">
                        {image}
                    </div>
                    <div className="avatar items-center justify-center flex">
                        <div className="w-14 rounded-full">
                        {image}
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="stat-title">Directer</div>
                    <div className="stat-value">{number}</div>
                    <div className="stat-desc flex gap-1 mt-1">{smallNumber} from {smallNumber}</div>
                </div>
                </div>
                {/* school created by */}
                <div className=' stats shadow w-full'>
                <div className=' stat'>
                <div className="stat-figure">
                <div className="">
                    <div className=" relative rounded-full">
                    {image}
                    </div>
                </div>
                    </div>
                    <div className="stat-title">Created by</div>
                    <div className="stat-value">{number}</div>
                    <div className="stat-desc flex gap-1 mt-1">{smallNumber} days ago</div>
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
                        {line}
                    </div>
                </div>
                </div>
                <div className=' mt-2 flex gap-2  flex-col'>
                    <div className=' flex justify-between items-center'>
                    <h4 className='  capitalize font-semibold '>contacts :</h4>
                    {number}
                    </div>
                    <div className=' flex  justify-between'>
                    <div className=' flex flex-col gap-2'>
                        <div className=' flex gap-2'>
                            <span className=' text-gray-500 font-medium '>Phone number :</span>
                            <span>{line}</span>
                        </div>
                        <div className=' flex gap-2'>
                            <span className=' text-gray-500 font-medium  capitalize'>email:</span>
                            <span className=' cursor-pointer' >{line}</span>
                        </div>
                        <div className=' flex gap-2'>
                        <span className=' text-gray-500 font-medium  capitalize'>Website:</span>
                        {line}
                        </div>
                    </div>
                    {/* other account */}
                    <div className=' flex flex-col gap-2'>
                        {line}
                        {line}
                        {line}
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

export default SchoolSettingLoading;
