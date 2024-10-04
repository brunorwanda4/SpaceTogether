import React from 'react'
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import { SPLine } from '../style/simpleComponents/line'
import { loginAuthProvider } from '@/server/authProvides';
import { Locale } from '@/i18n';
import Image from 'next/image';

interface Props {
    TProvides : string
    lang : Locale
}

const AuthProvides = ({TProvides , lang} : Props) => {
  return (
    <div className=' mt-2'>
        <div className=' flex gap-2'>
            <SPLine className='w-full  divider'/>
              <h4 className=' text-xs min-w-24 items-center flex justify-center'>{TProvides}</h4>
            <SPLine className='w-full  divider'/>
          </div>
        <div className=' flex justify-center gap-2 mt-2'>
        <button onClick={() => loginAuthProvider({provides : "github" , locale : lang})} className=' btn btn-circle btn-neutral'>
            <BsGithub size={24} />
        </button>
        <button className=' btn btn-circle btn-neutral' onClick={() => loginAuthProvider({provides : "google" , locale : lang})}>
            <BsGoogle size={24} />
        </button>
        <button className=' btn btn-circle btn-neutral'>
            <BsFacebook size={24} />
        </button>
        </div>
    </div>
  )
}

export default AuthProvides


export const RegisterProvider = () => {
  return (
    <div className=' p-4  gap-3 flex justify-center'>
      <button className=' relative size-10'>
        <Image 
          src={"/icons/google.png"}
           alt='google icon' 
           fill 
           sizes='20vh'
           className=' object-contain'
           />
      </button>
      <button className=' relative size-10'>
        <Image 
          src={"/icons/github.png"}
           alt='github icon' 
           fill 
           sizes='20vh' 
           className=' object-contain'
           />
      </button>
      <button className=' relative size-10'>
        <Image 
          src={"/icons/facebook.png"}
           alt='facebook icon' 
           fill 
           sizes='20vh' 
           className=' object-contain'
           />
      </button>
    </div>
  )
}
