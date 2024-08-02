"use client";

import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FormMessageError, FormMessageSuccess } from '@/components/auth/form/formMessagers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { SchoolClassValidation } from '@/validation/schoolValidation';
import { ISchool } from '@/types/school';
import { BsCheck2Circle } from 'react-icons/bs';
import { toast } from '@/components/ui/use-toast';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/hooks/useTheme';
interface props {
    school : ISchool;
    lang : string;
}

type FormData = z.infer<typeof SchoolClassValidation>;

export function AddClassSettingSchoolForm({
    school , lang
} : props) {
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");
  const theme = useTheme();

  const form = useForm<FormData>({
    resolver: zodResolver(SchoolClassValidation),
    defaultValues: {
      name: "",
      category:"",
      username: "",
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: 'firstError',
  });

  const onSubmit = async (values : z.infer<typeof SchoolClassValidation>) => {
        try {
            const res = await invoke<{message : string}>("insert_class" , {class : values});
            if(!!res.message){
                toast({
                    title : "WOW! class has been created successfully",
                    description: (
                      <div className=' flex gap-2'>
                        <BsCheck2Circle size={20} className=' text-success'/>
                        <span>{res.message}</span>
                      </div>
                    )
                  })
                  setSuccess(res.message);
         }
        } catch (err : any) {
            toast({
                title: "uh oh! some thing went wrong.",
                description: `${err}`,
                variant: "destructive",
            })
            setError(err);
        }

    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="line">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Class name' type="text" {...field} className="input input-info" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel >Training</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='flex'>
                      <SelectValue placeholder=" Select training" className="bg-transparent capitalize" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme}>
                    {school.type.map((items) => {
                        return (
                            <SelectItem className=' capitalize' value={items} key={items}>
                              {items}
                            </SelectItem>
                        )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input placeholder=' class username' type="text" {...field} className="input input-info" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className=' mt-2'>
            <FormMessageSuccess message={success} />
            <FormMessageError message={error} />
        </div>
        <div className=" flex justify-end mt-2 items-center gap-2">
          <button type="submit" className="btn btn-neutral btn-sm"> Add new school</button>
          <AlertDialogCancel type="reset">Cancel</AlertDialogCancel>
        </div>
      </form>
    </Form>
  );
}