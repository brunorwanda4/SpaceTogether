import { Input } from "@/components/ui/input"
import { BsSearch } from "react-icons/bs"

export const MessagesSearch = () => {
  return (
    <div className=" mt-1 w-full px-2">
        <div className=" relative">
            <Input className=" w-full" placeholder="Search"/>
            <button className=" absolute right-1 btn btn-sm btn-circle top-1 btn-ghost"><BsSearch size={12}/></button>
        </div>
    </div>
  )
}
