import { IoIosWarning } from 'react-icons/io'
import { CiCircleCheck } from "react-icons/ci";

interface Props {
  message ?: string;
}

export const FormMessageError = ({
  message
}: Props) => {
  if(!message) return null;
  return (
    <div className=' bg-error/20 px-1 py-2 rounded-md'>
      <div className='flex text-rose-600  text-sm gap-3'>
        <IoIosWarning size={20}/>
        <span>{message}</span>
      </div>
    </div>
  )
}

export const FormMessageSuccess = ({
  message
}: Props) => {
  if(!message) return null;
  return (
    <div className='flex text-green-500  text-sm gap-3'>
      <CiCircleCheck size={20}/>
      <span>{message}</span>
    </div>
  )
}
