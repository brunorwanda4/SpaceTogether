"use client";

import { Locale } from "@/i18n"
import { ISchool } from "@/types/school"
import { SchoolInfoValidation, } from "@/validation/schoolValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

import z from "zod";
import { MyImage } from "@/components/style/myImage";
import { Input } from "@/components/ui/input";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
  
import { useForm } from "react-hook-form"
import { ChangeEvent, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";

// @ts-ignore
import { BeatLoader } from 'react-spinners';
import { UpdateSchoolInfoServer } from "@/server/s/updateSchoolInfoServer";
import { toast } from "@/components/ui/use-toast";
import { BsCheck2Circle } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";


interface props {
    school : ISchool
    lang : Locale
}

const UpdateSchoolInfoForm = ({
    school , lang
} : props) => {
    const [error , setError] = useState<string | undefined>("");
    const [success , setSuccess] = useState<string | undefined>("");
    const [isPending , startTransition] = useTransition();
    const theme = useTheme();

    const form = useForm<z.infer <typeof SchoolInfoValidation>>({
        resolver : zodResolver(SchoolInfoValidation),
        defaultValues : {
            name :school.name ? school.name : "",
            username : school.username ? school.username : "",
            logo : school.logo ? school.logo : "",
            description : school.description ? school.description : "",
            type : school.type ? school.type : undefined,
            city : school.city ? school.city : "",
            country : school.country ? school.country : "Rwanda",
            province : school.province ? school.province : "",
        }
    });

      // location
      const [selectedProvince, setSelectedProvince] = useState("")
      const provincesAndCities = {
        Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
        Northern: ["Gicumbi", "Musanze", "Rulindo", "Burera", "Gakenke"],
        Southern: ["Huye", "Nyanza", "Muhanga", "Gisagara", "Kamonyi", "Nyamagabe", "Nyaruguru", "Ruhango"],
        Eastern: ["Kayonza", "Nyagatare", "Rwamagana", "Bugesera", "Gatsibo", "Kirehe", "Ngoma"],
        Western: ["Karongi", "Rubavu", "Rusizi", "Ngororero", "Nyabihu", "Nyamasheke", "Rutsiro"]
      };

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

    const onSubmit = (values : z.infer<typeof SchoolInfoValidation>) => {
        startTransition(() => {
            UpdateSchoolInfoServer(values, school._id).then((data) => {
                if(!!data.success){
                  setSuccess(data.success)
                  toast({
                    title : "School information updated successfully",
                    description : (
                      <div className="flex gap-2">
                        <BsCheck2Circle size={20} className="  text-success"/>
                        <span>{data.success}</span>
                      </div>
                    ),
                  });
                  setSuccess(data.success)
                } else if(!!data.error){
                  toast({
                    title : "Oops! Something went wrong",
                    variant : "destructive",
                    description : (
                      <div className="flex gap-2">
                        <IoIosWarning size={20} className="  text-error"/>
                        <span>{data.error}</span>
                      </div>
                    ),
                  });
                  setError(data.error)                  
                }
              })
        })
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
            <div>
                <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                    <FormItem className=" flex gap-2 items-center">
                    <FormLabel className='flex items-center w-full'>
                    <div className=" relative  size-24 cursor-pointer">
                    {field.value ? (
                        <MyImage src={field.value} className=" size-20" classname=" object-contain"/>
                    ) : (
                        <div className="">
                        <MyImage src={school.logo}/>
                        </div>
                    )}
                    </div>
                    <span className=" text-info flex  cursor-pointer">school Logo</span>
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
            {/* other information : name, username , description */}
                {/* name and user name */}
                <div className=" flex gap-2 w-full">
                    <FormField 
                     name="name"
                     control={form.control}
                     render={({field}) => (
                        <FormItem className=" w-full">
                            <FormLabel>
                                School name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="School name" type="text"/>
                            </FormControl>
                        </FormItem>
                     )}
                    />
                    <FormField 
                     name="username"
                     control={form.control}
                     render={({field}) => (
                        <FormItem className=" w-full">
                            <FormLabel >
                                School username
                            </FormLabel>
                            <FormControl>
                                <Input className=" w-full" {...field} placeholder="school_username" type="text"/>
                            </FormControl>
                        </FormItem>
                     )}
                    />
                </div>
                <div className=" mt-2 flex gap-4 w-full ">
                  <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem className=" w-full">
                          <FormLabel>Province</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value)
                              setSelectedProvince(value)
                            }}
                            defaultValue={school.province}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a province" />
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
                        <FormLabel>City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder= {cn(!!selectedProvince ? "Select a city" : "First select province")} />
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
                {/* description */}
                <FormField 
                    name="description"
                    control={form.control}
                    render={({field}) => (
                    <FormItem className=" w-full">
                        <FormLabel >
                            School description
                        </FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Our school we teacher student to be ...."/>
                        </FormControl>
                    </FormItem>
                    )}
                />
                  <div className=" flex justify-end mt-2 items-center gap-2">
                    <AlertDialogAction type="submit" className=""> {isPending ? <BeatLoader /> : "Update"}</AlertDialogAction>
                    <AlertDialogCancel type="reset">Cancel</AlertDialogCancel>
                </div>
        </form>
    </Form>
  )
}

export default UpdateSchoolInfoForm
