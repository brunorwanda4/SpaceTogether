"use client";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { BsPlus } from "react-icons/bs"

export const MessagesForm = () => {
  const [content , setContent] = useState<String | null>(null);

  const handleContent = (event: React.FormEvent<HTMLSpanElement>) => {
    setContent(event.currentTarget.textContent || "");
  }

  return (
    <div className=" flex px-2 w-full gap-2 items-center">
      <div className="  btn btn-circle btn-sm btn-neutral">
        <BsPlus size={20}/>
      </div>
      <div className="w-full bg-neutral rounded-md min-h-10 h-10 max-h-32 p-2">
        <p className=" h-full w-full">
            <span 
            inputMode="text"
             contentEditable 
             onInput={handleContent} 
             className=" outline-none h-full w-full">
              {!!content ? content : (<span className=" text-gray-500 ">Type a message...</span>)}
            </span>
        </p>
      </div>
    </div>
  )
}