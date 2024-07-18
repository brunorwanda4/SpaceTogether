"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form"
import z from "zod"
import { ChangeEvent, useState } from "react";
import AsyncSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import { SchoolValidation } from "@/validation/schoolValidation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/hooks/useTheme";
import UseOnlineStatus from "@/hooks/useOnlineStatus";
import { FaSchool } from "react-icons/fa6";

export interface CreateSchoolProps {
  email : string | null | undefined
  TName : string
  TUsername : string
  TPhone : string
  TLocation : string
  TType  : string
  TLogo : string
  TDescription : string
  TProvince : string
  TCity : string
  TWebsite : string
  TEmail : string
}

type SchoolOptionType = {
  value: string;
  label: string;
};


const SchoolOption: SchoolOptionType[] = [
  { value: 'primary', label: 'Primary School'},
  { value: 'middle', label: 'Middle School', },
  { value: 'high', label: 'High School'},
  { value: 'TVET', label: 'TVET School', },
  { value: 'international', label: 'International School',},
  { value: 'boarding', label: 'Boarding School',},
  { value: 'homeschooling', label: 'Homeschooling', },
  { value: 'online', label: 'Online School', },
  { value: 'vocational', label: 'Vocational/Technical', },
];

export const CreateSchoolForm = ({
  email, TName , TCity , TDescription ,TLocation ,TProvince,TLogo,TType,TUsername,TWebsite,TPhone,TEmail
} : CreateSchoolProps) => {
  // theme
  const theme = useTheme();
  const online = UseOnlineStatus();
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

    const form = useForm<z.infer<typeof SchoolValidation>>({
        resolver : zodResolver(SchoolValidation),
        defaultValues : {
            name : "",
            username : "",
            email : email ? email :"",
            country : "",
            city : "",
            province : "",
            logo : "",
            websiteURL : "",
            phoneNumber : "",
            type : undefined,
        }
    });

  // classes 
  const InputClassName =theme === "light" ? "border bg-base-300 w-full" : "bg-base-300 w-full"

  // multi select
  const animatedComponents = makeAnimated();

  const multiSelectStyle = {
    control: (baseStyles: any, state: any) => {
      return ({
        ...baseStyles,
        borderColor: "hsl(var(--input))",
        background: "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))"
      });
    },
    option : (style: any) => {
      return {...style, 
        backgroundColor: "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", 
        hight: " 128px" 
      }
    }
  }
  // location
  const [selectedProvince, setSelectedProvince] = useState("")
  const provincesAndCities = {
    Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
    Northern: ["Gicumbi", "Musanze", "Rulindo", "Burera", "Gakenke"],
    Southern: ["Huye", "Nyanza", "Muhanga", "Gisagara", "Kamonyi", "Nyamagabe", "Nyaruguru", "Ruhango"],
    Eastern: ["Kayonza", "Nyagatare", "Rwamagana", "Bugesera", "Gatsibo", "Kirehe", "Ngoma"],
    Western: ["Karongi", "Rubavu", "Rusizi", "Ngororero", "Nyabihu", "Nyamasheke", "Rutsiro"]
  };
  
  
  // submit

  const onSubmit = (data: z.infer<typeof SchoolValidation>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white bg-base-200 h-32">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  console.log("Something went wrong❤️❤️")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
       <div className=" flex gap-2 items-center justify-center w-full ">
          <FaSchool size={24} className={cn(" text-neutral")}/>
          <h2 className=" lg:text-xl font-semibold flex text-center leading-3 gap-2 font-allura">
            <span>Add School</span>
          </h2>
       </div>
        <div className=" w-full">
        <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
                <FormItem className=" flex gap-2 items-center">
                <FormLabel className='flex items-center w-80'>
                <div className=" relative  size-24 cursor-pointer">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt='School logo'
                      fill
                      priority
                      className='rounded-md object-contain'
                    />
                  ) : (
                    <div className="">
                      <Image
                      src='/profile.svg'
                      alt='School logo'
                      fill
                      className='object-contain  rounded-md'
                      />
                    </div>
                  )}
                </div>
                <span className=" text-info flex ">{TLogo}</span>
              </FormLabel>
                <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='cursor-pointer border-none bg-transparent outline-none file:text-blue !important'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        {/* other in put name and username */}
        <div className=" w-full">
          {/* name and username */}
          <div className=" mt-2 flex gap-4 w-full">
            <FormField 
            name="name"
            control={form.control}
            render={({field}) => (
              <FormItem className=" w-full">
                <FormLabel>
                 {TName}
                </FormLabel>
                <FormControl>
                  <Input className={cn(InputClassName)} type="text" placeholder=" School name" {...field}/>
                </FormControl>
              </FormItem>
            )}
            />
            <FormField 
            name="username"
            control={form.control}
            render={({field}) => (
              <FormItem className=" w-full">
                <FormLabel>
                  {TUsername}
                </FormLabel>
                <FormControl>
                  <Input className={cn(InputClassName)} type="text" placeholder=" School username" {...field}/>
                </FormControl>
              </FormItem>
            )}
            />
          </div>
          {/* email and phone number */}
          <div className=" mt-2 flex gap-4 w-full">
            <FormField 
            name="phoneNumber"
            control={form.control}
            render={({field}) => (
              <FormItem className=" w-full">
                <FormLabel>
                  {TPhone}
                </FormLabel>
                <FormControl>
                  <Input className={cn(InputClassName)} type="number" placeholder=" 0792537274" {...field}/>
                </FormControl>
              </FormItem>
            )}
            />
            <FormField 
            name="email"
            control={form.control}
            render={({field}) => (
              <FormItem className=" w-full">
                <FormLabel>
                  {TEmail}
                </FormLabel>
                <FormControl>
                  <Input className={cn(InputClassName)} type="text" placeholder={cn(!!email ? email : "email@example.com")} {...field}/>
                </FormControl>
              </FormItem>
            )}
            />
          </div>
          {/* school website and type */}
          <div className=" mt-2 flex gap-4 w-full">
            <FormField 
            name="websiteURL"
            control={form.control}
            render={({field}) => (
              <FormItem className=" w-full">
                <FormLabel>
                  {TWebsite}
                </FormLabel>
                <FormControl>
                  <Input className={cn(InputClassName)} type="text" placeholder=" https://exampleschool.com/" {...field}/>
                </FormControl>
              </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className=" w-full bg-base-300">
                  <FormLabel>{TType}</FormLabel>
                  <FormControl>
                    <AsyncSelect
                      {...field}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue
                      name = "school"
                      isMulti
                      options={SchoolOption}
                      styles={multiSelectStyle}
                      onChange={field.onChange}
                      classNamePrefix={"select"}
                      className={cn(InputClassName)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                  )}
                />
          </div>
          {/* country , province and city */}
          {/* TODO : ADD OTHER COUNTRIES */}
          <div className=" mt-2 flex gap-4 w-full ">
          <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>{TProvince}</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedProvince(value)
                    }}
                    defaultValue=""
                  >
                    <FormControl>
                      <SelectTrigger className={cn(InputClassName)}>
                        <SelectValue className={cn(InputClassName)} placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {Object.keys(provincesAndCities).map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="  w-full">
              <FormLabel>{TCity}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="">
                <FormControl>
                  <SelectTrigger className={cn(InputClassName)}>
                    <SelectValue className={cn(InputClassName)} placeholder= {cn(!!selectedProvince ? "Select a city" : "First select province")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent data-theme={theme}>
                  {selectedProvince &&
                    (provincesAndCities as any)[selectedProvince].map((city : string) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <div>
           <FormField 
            name="description"
            control={form.control}
            render={({field}) => (
              <FormItem className=" w-full">
                <FormLabel>
                  {TDescription}
                </FormLabel>
                <FormControl>
                  <Textarea className={cn(InputClassName)} placeholder="Explain your school " {...field}/>
                </FormControl>
              </FormItem>
            )}
            />
          </div>
        </div>
        <button  className=' btn btn-neutral capitalize w-full mt-2 font-medium' type='submit'>
          Send request
        </button>
      </form>
    </Form>
  )
}
