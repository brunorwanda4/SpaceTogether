"use client";

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import { LoginValidation } from '@/validation/loginValidation';
import { zodResolver } from "@hookform/resolvers/zod"
import { Locale } from '@/i18n';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import UseOnlineStatus from '@/hooks/useOnlineStatus';
import Link from 'next/link';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

interface Props {
    TPassword: string;
    TUsername: string;
    lang : Locale
    TLogin : string;
    TForget : string;
}

const LoginForm = ({
  lang ,TForget, TPassword ,TLogin , TUsername
} : Props) => {
  const [seePassword , setSeePassword] = useState<boolean>(true);
    
  const online = UseOnlineStatus();

    const form = useForm<z.infer <typeof LoginValidation>> ({
        resolver : zodResolver(LoginValidation),
        defaultValues : {
            username : "",
            password : "",
        },
    });

    const handleSeePassword = () => {
      setSeePassword(sate => !sate)
    }
  return (
    <Form {...form} >
      <form action="" className=' flex flex-col gap-2'>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TUsername}</FormLabel>
              <FormControl>
                <Input className=' bg-base-300' autoFocus placeholder="user_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TPassword}</FormLabel>
              <FormControl>
                <div className=' relative '>
                  <Input className=' bg-base-300 ' placeholder="password" type={seePassword ? "password" : "text"} {...field} />
                  <div className=' absolute right-0 top-0 items-center flex rounded-r-md cursor-pointer h-full w-6 px-1 hover:bg-neutral/40 duration-200' onClick={handleSeePassword}>
                      {seePassword ? <ImEye size={24} /> : <ImEyeBlocked size={24} />}
                    </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!online && <Link className='link-hover text-sm duration-300 text-neutral leading-4' href={`/${lang}/auth/forgetPassword`}>{TForget}</Link>}
        <button className=' btn btn-neutral capitalize font-semibold' type='submit'>
          {TLogin}
        </button>
      </form>
    </Form>
  )
}

export default LoginForm
