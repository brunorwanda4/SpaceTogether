
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from "zod";
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
import { ImEye, ImEyeBlocked } from "react-icons/im";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { LoginValidation } from '@/validation/loginValidation';
import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSideProps } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Locale } from '@/i18n';
import { RegisterValidation } from '@/validation/registerValidation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { regServer } from '@/server/regServer';
import { FormMessageError, FormMessageSuccess } from './formMessagers';
import { redirect, useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

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
}

const RegisterForm = ({
    lang , TPassword ,TLogin ,TDay,TMonth,TYear,TGender,TOther,TFName,TFmale,TLName,TMale,TEmail,TCreate
  } : RegisterProps) => {
    // show password
    const [seePassword , setSeePassword] = useState<boolean>(true);
    const handleSeePassword = () => {
      setSeePassword(sate => !sate)
    }

    // month
    const months ={ January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31,};

    const form = useForm<z.infer <typeof RegisterValidation>> ({
        resolver : zodResolver(RegisterValidation),
        defaultValues : {
          email : "",
          password : "",
          FName : "",
          LName: "",
          day : "",
          month : "",
          year : "",
        },
    });

    const DivClass = ["flex gap-2 flex-col","bg-base-300 lg:min-w-60"];

    const [error , setError] = useState<string | undefined>("");
    const [success , setSuccess] = useState<string | undefined>("");
    const [isPending , startTransition] = useTransition();

    // router
    const router = useRouter();

    const onSubmit = (values : z.infer<typeof RegisterValidation>) => {
      startTransition(() => {
        regServer(values).then((data) => {
          
          if(!!data.success) {
            toast({
              description: `${data.success}`
            })
            setSuccess(data.success);
            router.push(`/${lang}/auth/data`)
          }
          if(!!data.error) {
            toast({
                title: "uh oh! some thing went wrong.",
                description: `${data.error}`,
                variant: "destructive",
            })
            setError(data.error);
          }
          
        })
      })
    }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=' flex gap-2 flex-col'>
        <div className=' flex gap-2'>
        {/* left */}
        <div className={cn(DivClass[0])}>
            {/* first name */}
            <FormField
            control={form.control}
            name="FName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{TFName}</FormLabel>
                <FormControl>
                    <Input className={cn(DivClass[1])} disabled={isPending} autoFocus placeholder="Rwanda" {...field} />
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
            <div className=' flex flex-col gap-2 justify-between'>
            <Label>Date of birth</Label>
            <div className=' flex gap-2 justify-between'>
              {/* day */}
              <FormField control={form.control} name="day" render={({ field }) => (
                <FormItem>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className=' line h-16 bg-base-100 flex flex-col'>
                        <FormLabel className=' text-xs flex items-center gap-1 justify-center max-w-12'><span>{TDay}</span> <ChevronDown className="h-4 w-4 opacity-50" /></FormLabel>
                        <SelectValue placeholder="11" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=' min-h-40 max-h-60'>
                    {[...Array( 31)].map((_, index) => (
                      <SelectItem key={index + 1} value={`${index + 1}`}>
                        {index + 1}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* month */}
            <FormField control={form.control}  name="month" render={({ field }) => (
                <FormItem>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className=' flex flex-col h-16 w-full bg-base-100 max-w-20'>
                      <FormLabel className=' text-xs flex items-center gap-1 justify-center max-w-12'><span>{TMonth}</span> <ChevronDown className="h-4 w-4 opacity-50" /></FormLabel>
                        <SelectValue placeholder=" November" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=' min-h-40 max-h-60'>
                      {Object.keys(months).map((items , index) => (
                        <SelectItem key={index + 1} value={items}>
                          {items}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* year */}
            <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className=' line h-16 bg-base-100  flex flex-col'>
                        <FormLabel className=' text-xs flex items-center gap-1 justify-center max-w-12'><span>{TYear}</span> <ChevronDown className="h-4 w-4 opacity-50" /></FormLabel>
                        <SelectValue className=' text-xs' placeholder=" 2006"  />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=' text-xs min-h-40 max-h-60'>
                      {[...Array(100)].map((_, index) => (
                        <SelectItem key={2024 - index} value={`${2024 - index}`}>
                          {2024 - index}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>
          </div>
        </div>
        {/* right */}
        <div className={cn(DivClass[0])}>
          {/* Last name */}
          <FormField
            control={form.control}
            name="LName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{TLName}</FormLabel>
                <FormControl>
                  <div className=' relative'>
                    <Input className={cn(DivClass[1])} placeholder="Bruno" type={"text"} {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            {/* gender */}
            <FormField control={form.control}  name="gender" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{TGender}</FormLabel>
              <FormControl>
                <RadioGroup disabled={isPending} onValueChange={field.onChange}  defaultValue={field.value} className="flex space-x-1">
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem className=' border-input' value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {TMale}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem className=' border-input' value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {TFmale}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem className=' border-input' value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">{TOther}</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
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
        </div>
        </div>
        <FormMessageError message={error}/>
        <FormMessageSuccess message={success}/>
        <button className=' btn btn-neutral capitalize font-semibold' type='submit'>
          {TCreate}
        </button>
      </form>
    </Form>
  )
}

export default RegisterForm
