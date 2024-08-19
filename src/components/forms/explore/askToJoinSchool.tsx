"use client";

import { BeatLoader } from "react-spinners";
import z from "zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";
import {invoke} from "@tauri-apps/api/tauri"
import {save} from "@tauri-apps/api/dialog"

import { ISchool } from "@/types/school"
import { SchoolAskToJoinValidation } from "@/validation/schoolValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MyImage } from "@/components/style/myImage";
import { useTheme } from "@/hooks/useTheme";
import { Textarea } from "@/components/ui/textarea";
import { FormMessageError, FormMessageSuccess } from "@/components/auth/form/formMessagers";
import { Label } from "@/components/ui/label";
import { TUser } from "@/types/user";
import { AskToJoinSchoolServer } from "@/server/s/askTojoinSchoolServer";
import { BsCheck2Circle } from "react-icons/bs";
import { toast } from "@/components/ui/use-toast";



interface props {
    school : ISchool
    user_id : string | undefined
};

const AskToJoinSchool = ({
    school , user_id
} : props) => {
    const [error , setError] = useState<string | undefined>("");
    const [success , setSuccess] = useState<string | undefined>("");
    const [isPending , startTransition] = useTransition();
    const theme = useTheme();

    // Image 
    const [files, setFiles] = useState<File[]>([]);
    const handleImage = (
      e: ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
    ) => {
      e.preventDefault();
  
      const fileReader = new FileReader();
  
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFiles(Array.from(e.target.files));
  
        if (!file.type.includes("image")) return;
  
        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          fieldChange(imageDataUrl);
        };
  
        fileReader.readAsDataURL(file);
      }
    };

    const [monthDay , setMonthDay] = useState("")
    const months ={ January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31,};
    const generateDaysArray = (days: number) => {
        return Array.from({ length: days }, (_, index) => index + 1);
    };

    const form = useForm<z.infer <typeof SchoolAskToJoinValidation>>({
        resolver : zodResolver(SchoolAskToJoinValidation),
        defaultValues : {
            prName : "",
            stFName : "",
            stLName : "",
            stBirthDay : "",
            stBirthMonth : "",
            stBirthYear : "",
            prEmail : "",
            prPhone : "",
            description : "",
            stGender : undefined,
            stImage : "",
            report: "",
            stEmail : "",
        }
    })


    const onSubmit = (values : z.infer<typeof SchoolAskToJoinValidation>) => {
        startTransition(  async () => {
            AskToJoinSchoolServer(values , school , user_id).then((data) => {
          
                if(!!data?.success) {
                  toast({
                    title : `WOW! You have send request to join ${school.name}`,
                    description: (
                      <div className=' flex gap-2'>
                        <BsCheck2Circle size={20} className=' text-success'/>
                        <span>{data.success}</span>
                      </div>
                    )
                  })
                  setSuccess(data.success);
                }
                if(!!data?.error) {
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

    console.log("hello bruno ❤️")
  return (
    <div className=" mt-2">
        <h3 className="  font-semibold  text-2xl text-center">Ask place on <strong>{school.name}</strong>!</h3>
        <Form {...form}>
            <form className=" mt-2" onSubmit={form.handleSubmit(onSubmit)}>
                <div className=" flex w-full justify-between gap-2 max-md:flex-col">
                    <div className=" w-full">
                        <div className=" flex gap-2 flex-col w-full max-md:gap-2 ">
                            <div className=" flex gap-2 w-full max-md:flex-col">
                                <FormField
                                control={form.control}
                                name="stFName"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                    <FormLabel>Student first name</FormLabel>
                                    <FormControl>
                                        <Input className={cn()} disabled={isPending} placeholder="Rwanda" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <div className=" w-1/2">
                                    
                                </div>
                            </div>
                            {/* gender */}
                            <div className=" flex max-md:flex-col max-md:w-full">
                                <div className=" flex gap-2 w-1/2 justify-between max-md:flex-col max-md:w-full">
                                    <FormField control={form.control}  name="stGender" render={({ field }) => (
                                    <FormItem className="space-y-3">
                                    <FormLabel>student Gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup disabled={isPending} onValueChange={field.onChange}  defaultValue={field.value} className="flex space-x-1">
                                        <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2 justify-center">
                                            <FormControl>
                                            <RadioGroupItem className=' border-input' value="male" />
                                            </FormControl>
                                            <FormLabel className="font-normal"> Male </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                                            <FormControl>
                                            <RadioGroupItem className=' border-input' value="female" />
                                            </FormControl>
                                            <FormLabel className="font-normal"> female </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                                            <FormControl>
                                            <RadioGroupItem className=' border-input' value="other" />
                                            </FormControl>
                                            <FormLabel className="font-normal">other</FormLabel>
                                        </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}/>
                                {/* age */}
                               <div className=" flex flex-col gap-2 w-1/2 mr-2">
                                    <Label>
                                        Student age
                                    </Label>
                                    <div className=' flex gap-2 justify-between flex-row-reverse'>
                                    {/* day */}
                                    <FormField control={form.control} name="stBirthDay" render={({ field }) => (
                                    <FormItem>
                                    <Select 
                                    disabled={isPending} 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                        <div>
                                            <FormLabel className=' text-xs flex items-center gap-1 justify-center w-auto'>
                                                <span>Day</span>
                                            </FormLabel>
                                            <SelectTrigger className=' flex flex-col w-full bg-base-100  bg-transparent'>
                                                <SelectValue className=" bg-transparent"/>
                                            </SelectTrigger>
                                        </div>
                                        </FormControl>
                                        <SelectContent data-theme={theme} className=' min-h-40 max-h-60'>
                                        {monthDay ? generateDaysArray(months[monthDay as keyof typeof months]).map((day: number , index) => (
                                            <SelectItem key={index + 1} value={String(day)}>
                                                {day}
                                            </SelectItem>
                                        )) : ("Select Month!")}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                    )}/>
                                    {/* month */}
                                    <FormField control={form.control}  name="stBirthMonth" render={({ field }) => (
                                        <FormItem>
                                        <Select 
                                        disabled={isPending}
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            setMonthDay(value)
                                        }} 
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                            <div>
                                                <FormLabel className=' text-xs flex items-center gap-1 justify-center w-auto'>
                                                    <span>Month</span>
                                                </FormLabel>
                                                <SelectTrigger className=' flex flex-col bg-base-100  bg-transparent w-20'>
                                                    <SelectValue className=" bg-transparent"/>
                                                </SelectTrigger>
                                            </div>
                                            </FormControl>
                                            <SelectContent data-theme={theme} className=' min-h-40 max-h-60'>
                                            {Object.keys(months).map((items, index) => (
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
                                    <FormField control={form.control} name="stBirthYear" render={({ field }) => (
                                        <FormItem>
                                        <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <div>
                                                <FormLabel className=' text-xs flex items-center gap-1 justify-center w-auto'>
                                                    <span>Year</span>
                                                </FormLabel>
                                                <SelectTrigger className=' flex flex-col w-14 bg-base-100  bg-transparent'>
                                                    <SelectValue className=" bg-transparent"/>
                                                </SelectTrigger>
                                            </div>
                                            </FormControl>
                                            <SelectContent data-theme={theme} className=' text-xs min-h-40 max-h-60'>
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
                                {/* student report */}
                                <div className=" w-1/2 max-md:w-full">
                                    <FormField
                                        control={form.control}
                                        name="stEmail"
                                        render={({ field }) => (
                                            <FormItem className=" w-full">
                                            <FormLabel>Student email</FormLabel>
                                            <FormControl>
                                                <Input type="email" className={cn(" cursor-pointer max-md:w-full")} disabled={isPending} placeholder="email@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* parent information */}
                        <div className=" flex flex-col">
                            <div className=" flex gap-2 max-md:flex-col">
                                <FormField
                                    control={form.control}
                                    name="prName"
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                        <FormLabel>Parent name</FormLabel>
                                        <FormControl>
                                            <Input className={cn()} disabled={isPending} placeholder="Rwanda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="report"
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                        <FormLabel>Student Report </FormLabel>
                                        <FormControl>
                                            <Input className={cn(" cursor-pointer")} disabled={isPending} type="file" placeholder="Rwanda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* parent email email  */}
                            <div className=" flex gap-2 max-md:flex-col">
                                <FormField
                                    control={form.control}
                                    name="prEmail"
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                        <FormLabel>Parent Email</FormLabel>
                                        <FormControl>
                                            <Input className={cn()} disabled={isPending} placeholder="email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="prPhone"
                                    render={({ field }) => (
                                        <FormItem className=" w-full">
                                        <FormLabel>Parent phone number</FormLabel>
                                        <FormControl>
                                            <Input className={cn()} disabled={isPending} type="number" placeholder="Your parent phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                            <FormLabel>Description and the class student what</FormLabel>
                            <FormControl>
                                <Textarea className={cn()} disabled={isPending} placeholder="explain why join our school" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className="">
                        <FormField
                            control={form.control}
                            name="stImage"
                            render={({ field }) => (
                                <FormItem className=" flex gap-2 items-center flex-col">
                                <FormLabel aria-disabled={isPending} className='flex items-center flex-col gap-2  cursor-pointer'>
                                        {field.value ? ( <MyImage src={field.value} className='object-contain  rounded-md size-44 cursor-pointer' classname=" cursor-pointer rounded-full"/>
                                        ) : (<MyImage src={"/profile.svg"} className='object-contain  rounded-md size-44 cursor-pointer' />)}
                                    <span className="flex  cursor-pointer">Student image</span>
                                    </FormLabel>
                                <FormControl>
                                <Input type='file' accept='image/*' placeholder='Add profile photo' className='cursor-pointer border-none bg-transparent outline-none file:text-blue !important hidden' onChange={(e) => handleImage(e, field.onChange)} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                </div>
                <div className=" mt-2 flex flex-col gap-2">
                    <FormMessageError message={error}/>
                    <FormMessageSuccess message={success}/>
                </div>
                {/* send request */}
                <div className=" mt-2">
                    <button type="submit" className=" btn btn-neutral w-full">
                        {isPending ? <BeatLoader /> : "Send student information"}
                    </button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default AskToJoinSchool
