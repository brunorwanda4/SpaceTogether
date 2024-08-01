"use client";

import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Locale } from "@/i18n";
import { ISchool } from "@/types/school";
import { SchoolClassValidation } from "@/validation/schoolValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface props {
    school : ISchool;
    lang : Locale;
}

export const AddClassSettingSchoolForm = ({
    school , lang
}: props) => {
    const form  = useForm<z.infer <typeof SchoolClassValidation>>({
        resolver : zodResolver(SchoolClassValidation),
        defaultValues : {
            name : "",
            username : "",
        }
    })
  return (
    <Form {...form}>
        <form>
            <div className=" line">
                <FormField 
                 control={form.control}
                 name="name"
                 render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Class name
                        </FormLabel>
                        <FormControl>
                            <Input className=" "/>
                        </FormControl>
                    </FormItem>
                 )}
                />
                <FormField 
                 control={form.control}
                 name="name"
                 render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Class username
                        </FormLabel>
                        <FormControl>
                            <Input className=" "/>
                        </FormControl>
                    </FormItem>
                 )}
                />
            </div>
            <div className=" flex justify-end mt-2 items-center gap-2">
                <AlertDialogAction type="submit" className=""> Update</AlertDialogAction>
                <AlertDialogCancel type="reset">Cancel</AlertDialogCancel>
            </div>
        </form>

    </Form>
  )
}
