"use client";

import React, { useState } from 'react'
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
import { GetServerSideProps } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n';
import { BsEye, BsEyeFill } from 'react-icons/bs';

interface Props {
    TPassword: string;
    TUsername: string;
    lang : Locale
}

const LoginForm = ({lang , TPassword , TUsername} : Props) => {
  const [seePassword , setSeePassword] = useState<boolean>(false);
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
                <Input className=' bg-base-300' placeholder="user_name" {...field} />
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
                  <div className=' absolute  top-2 right-4 ' onClick={handleSeePassword}>
                    {seePassword ? <BsEyeFill size={24} /> : <BsEye size={24} />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default LoginForm
