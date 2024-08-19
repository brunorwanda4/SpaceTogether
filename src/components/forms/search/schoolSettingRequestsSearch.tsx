import { Input } from "@/components/ui/input"
import { FiSearch } from "react-icons/fi"

const SchoolSettingRequestsSearch = () => {
  return (
    <div className=" p-1 relative ">
      <Input className=" bg-transparent border border-neutral" placeholder="Search request "/>
      <button className=" absolute top-0 right-4 flex items-center justify-center h-full"><FiSearch size={20}/></button>
    </div>
  )
}

export default SchoolSettingRequestsSearch
