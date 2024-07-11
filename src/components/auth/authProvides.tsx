import React from 'react'
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import { SPLine } from '../style/simpleComponents/line'

interface Props {
    TProvides : string
}

const AuthProvides = ({TProvides} : Props) => {
  return (
    <div className=' mt-2'>
        <div className=' flex gap-2'>
            <SPLine />
            <h4 className=' text-xs'>{TProvides}</h4>
            <SPLine />
          </div>
        <div className=' flex justify-center gap-2 mt-2'>
        <button className=' btn btn-circle btn-neutral'>
            <BsGithub size={24} />
        </button>
        <button className=' btn btn-circle btn-neutral'>
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
