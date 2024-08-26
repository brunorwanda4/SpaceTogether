"use client";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { BsPlus } from "react-icons/bs"

export const MessagesForm = () => {
  const [content , setContent] = useState<String | null>(null);

  const handleContent = (event: React.FormEvent< HTMLSpanElement>) => {
    setContent(event.currentTarget.textContent || "");
  }

  return (
    <div className=" flex px-2 w-full gap-2 items-center">
      <div className="  btn btn-circle btn-sm btn-neutral">
        <BsPlus size={20}/>
      </div>
      <div className=" w-full">
        <p className="w-full bg-neutral rounded-md min-h-10 h-10" contentEditable onInput={handleContent}>
            <span>{content}</span>
        </p>
      </div>
    </div>
  )
}



// const EditableTextComponent= () => {
//   const [content, setContent] = useState<string>('Edit this text...');

//   const handleInput = (event: React.FormEvent<HTMLParagraphElement | HTMLSpanElement>) => {
//     setContent(event.currentTarget.textContent || '');
//   };

//   return (
//     <div>
//       <p
//         contentEditable
//         onInput={handleInput}
//         style={{
//           border: '1px solid #ccc',
//           padding: '8px',
//           minHeight: '100px',
//           whiteSpace: 'pre-wrap',
//         }}
//       >
//         {content}
//       </p>
//       <span
//         contentEditable
//         onInput={handleInput}
//         style={{
//           border: '1px solid #ccc',
//           padding: '8px',
//           minHeight: '100px',
//           display: 'inline-block',
//           whiteSpace: 'pre-wrap',
//         }}
//       >
//         {content}
//       </span>
//     </div>
//   );
// };

// export default EditableTextComponent;
