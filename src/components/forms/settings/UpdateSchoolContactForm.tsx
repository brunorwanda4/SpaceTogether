"use client";

import { MyImage } from "@/components/style/myImage";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ISchool } from "@/types/school";
import { SchoolContactValidation } from "@/validation/schoolValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"

interface props {
  school : ISchool
}

const UpdateSchoolContactForm = ({
  school
} : props) => {
  const form = useForm<z.infer <typeof SchoolContactValidation>>({
    resolver : zodResolver(SchoolContactValidation),
    defaultValues : {
      phoneNumber : school.phoneNumber ? school.phoneNumber : "",
      email : school.email ? school.email : "",
      websiteURL : school.websiteURL ? school.websiteURL : "",
      facebook : "",
      twitter : "",
      whatsapp : ""
    }
  })

  const onSubmit = (values : z.infer<typeof SchoolContactValidation>) => {
    // Update School contact server call here
    console.log("school contact data 🌳🌳:" , {values})
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex gap-2">
          <div className=" w-full">
            <FormField 
            name = "email"
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="email@example.com" />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField 
            name = "phoneNumber"
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="+250 7925 37274" />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField 
            name = "websiteURL"
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="https://www.example.com" />
                </FormControl>
              </FormItem>
            )}
            />
          </div>
          <div className=" w-full">
            {/* whatsapp */}
            <FormField 
            name = "whatsapp"
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel className=" flex gap-2 mt-2">
                  <MyImage className=" size-4" src={"/icons/whatsapp.png"}/>
                  Whatsapp
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="+250 7925 37274" />
                </FormControl>
              </FormItem>
            )}
            />
            {/* facebook */}
            <FormField 
            name = "facebook"
            control={form.control}
            render={({field}) => (
              <FormItem>
                 <FormLabel className=" flex gap-2 mt-2">
                  <MyImage className=" size-4" src={"/icons/facebook.png"}/>
                  Facebook
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="username on facebook or URL" />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField 
            name = "twitter"
            control={form.control}
            render={({field}) => (
              <FormItem>
                 <FormLabel className=" flex gap-2 mt-2">
                  <MyImage className=" size-4" src={"/icons/twitter.png"}/>
                  Twitter (x)
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="username on twitter or URL" />
                </FormControl>
              </FormItem>
            )}
            />
          </div>
        </div>
        <div className=" flex justify-end mt-2 items-center gap-2">
          <AlertDialogAction type="button" className=" mt-2 ">
            <input className=" cursor-pointer" type="submit" value={"Update"} />
          </AlertDialogAction>
          <AlertDialogCancel type="reset">Cancel</AlertDialogCancel>
        </div>
      </form>
    </Form>
  )
}

export default UpdateSchoolContactForm
