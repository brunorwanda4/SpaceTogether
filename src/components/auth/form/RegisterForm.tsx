import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from "zod";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { ImEye, ImEyeBlocked } from "react-icons/im";

import { zodResolver } from "@hookform/resolvers/zod"
import { Locale } from '@/i18n';
import { RegisterValidation } from '@/validation/registerValidation';
import { cn } from '@/lib/utils';
import { FormMessageError, FormMessageSuccess } from './formMessagers';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { BeatLoader } from 'react-spinners';
import { BsCheck2Circle } from 'react-icons/bs';
import { useTheme } from '@/hooks/useTheme';
import { create_user } from '@/controllers/user_controller';
import { IoIosWarning } from 'react-icons/io';
import { invoke } from '@tauri-apps/api/tauri';

export interface RegisterProps {
    TPassword: string;
    lang : Locale
    TLogin : string;
    TLName : string
    TFName : string
    TEmail : string
    TDay : string
    TMonth : string
    TYear : string
    TGender : string
    TMale : string
    TFmale : String
    TOther : string
    TCreate : string
    TCPassword : string
}

const RegisterForm = ({
    lang , TPassword ,TLogin ,TDay,TMonth,TYear,TGender,TOther,TFName,TFmale,TLName,TMale,TEmail,TCreate, TCPassword
  } : RegisterProps) => {
    // show password
    const [seePassword , setSeePassword] = useState<boolean>(true);
    const [seePasswordConfirm , setSeePasswordConfirm] = useState<boolean>(true);

    const handlerSeePasswordConfirm = () => {
      setSeePasswordConfirm(sate => !sate)
    }
    const handleSeePassword = () => {
      setSeePassword(sate => !sate)
    }

    // router
    const router = useRouter();

    // themes
    const themes= useTheme();

    // month
    const months ={ January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31,};

    const form = useForm<z.infer <typeof RegisterValidation>> ({
        resolver : zodResolver(RegisterValidation),
        defaultValues : {
          email : "",
          password : "",
          name : "",         
        },
        shouldFocusError : true,
        shouldUnregister : true,
        criteriaMode : "firstError",
        reValidateMode : "onChange",
        mode : "onChange"
    });
    

    const DivClass = ["flex gap-2 flex-col w-full","bg-base-100 w-96 max-lg:w-full lg:min-w-60"];

    const [error , setError] = useState<string | undefined>("");
    const [success , setSuccess] = useState<string | undefined>("");
    const [isPending , startTransition] = useTransition();

    const onSubmit = async (values : z.infer<typeof RegisterValidation>) => {
      setError("");
      setSuccess("");
      const validation = RegisterValidation.safeParse(values);
      if (!validation.success) {
        return setError("All fields are required")
      };

      const {email , name , password} = validation.data;
      startTransition(async () => {
        const validation = RegisterValidation.safeParse(values);
        if (!validation.success) return setError("All fields are required");

        try {
          const res = await invoke<{message : string , success : boolean}>("api_user_create_new" , {user : {email , password , name}});
          
          if (res.success) {
            toast({
              title : "WOW! Account has been created successfully",
              description: (
                <div className=' flex gap-2'>
                  <BsCheck2Circle size={20} className=' text-success'/>
                  <span>WOW! Account has been created successfully!</span>
                </div>
              )
            })
            setSuccess("You have been create account!");
            return router.push(`/auth/onboarding/${res.message}`)
          } else {
            toast({
              title: "uh oh! some thing went wrong.",
              description: (
              <div className=' flex gap-2'>
                <IoIosWarning size={20} className=' text-error'/>
                <span>{res.message}</span>
              </div>
              ),
                variant: "destructive",
            })
            setError(res.message);
          }
        } catch (err: any) {
          toast({
            title: "uh oh! some thing went wrong.",
            description: (
            <div className=' flex gap-2'>
              <IoIosWarning size={20} className=' text-error'/>
              <span>{err}</span>
            </div>
            ),
              variant: "destructive",
          })
          setError(err);
        }
      })
    }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=' flex gap-2 flex-col w-full'>
        {/* left */}
        <div className={cn(DivClass[0])}>
            {/* first name */}
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className=' w-full'>
                <FormLabel>{TFName}</FormLabel>
                <FormControl>
                    <Input className={cn(DivClass[1] , "")} disabled={isPending} autoFocus placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* email */}
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{TEmail}</FormLabel>
                <FormControl>
                    <Input className={cn(DivClass[1])} disabled={isPending} type='email' placeholder="example@email.com" {...field} />
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
                  <div className=' relative'>
                    <Input className={cn(DivClass[1])} disabled={isPending} placeholder="password" type={seePassword ? "password" : "text"} {...field} />
                    <div className=' absolute right-0 top-0 items-center flex rounded-r-md cursor-pointer h-full w-6 px-1 hover:bg-neutral/40 duration-200' onClick={handleSeePassword}>
                      {seePassword ? <ImEye size={24} /> : <ImEyeBlocked size={24} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{TCPassword}</FormLabel>
                <FormControl>
                  <div className=' relative'>
                    <Input className={cn(DivClass[1])} disabled={isPending} placeholder="password" type={seePasswordConfirm ? "password" : "text"} {...field} />
                    <div className=' absolute right-0 top-0 items-center flex rounded-r-md cursor-pointer h-full w-6 px-1 hover:bg-neutral/40 duration-200' onClick={handlerSeePasswordConfirm}>
                      {seePasswordConfirm ? <ImEye size={24} /> : <ImEyeBlocked size={24} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      </div>
        <FormMessageError message={error}/>
        <FormMessageSuccess message={success}/>
        <button className={cn(" btn btn-neutral capitalize font-semibold btn-info" ,isPending && "btn-disabled")} type='submit'>
          {isPending ? <BeatLoader size={20} /> : `${TCreate}`}
        </button>
      </form>
    </Form>
  )
}

export default RegisterForm