import { FiSearch } from "react-icons/fi"
import { Input } from "../ui/input"

const SchoolSettingsSearch = () => {
  return (
    <div className=" p-2 relative">
      <Input className=" bg-transparent" placeholder="Search settings"/>
      <button className=" absolute top-0 right-4 flex items-center justify-center h-full"><FiSearch size={20}/></button>
    </div>
  )
}

export default SchoolSettingsSearch
