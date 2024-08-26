import { BsThreeDots } from "react-icons/bs"
import { MyImage } from "../style/myImage"

export const MessageNavConversation = () => {
  return (
    <nav className="  top-12 border-b border-neutral h-12 w-full  backdrop-blur-lg flex flex-1 px-2 items-center justify-between">
      <div className=" flex items-center w-auto gap-2">
        <MyImage className=" size-10 rounded-full" classname=" size-10 rounded-full" src={"/profiles/b/20.png"} />
        <h4 className=" flex items-center font-semibold">Assum Uwase</h4>
      </div>
      <div className=" ">
        <div className=" btn btn-sm btn-circle btn-ghost  ">
          <BsThreeDots size={20}/>
        </div>
      </div>
    </nav>
  )
}
