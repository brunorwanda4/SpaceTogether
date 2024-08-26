"use client"
import { FormMessageError, FormMessageSuccess } from "@/components/auth/form/formMessagers"
import { AlertDialogAction , AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { JoinSchoolValidation } from "@/validation/schoolValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

interface joinSchoolFormProps {
  email : string | null | undefined
}

export const JoinSchoolForm = ({
  email
} : joinSchoolFormProps) => {
  const [isPending , startTransition] = useTransition();
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer <typeof JoinSchoolValidation>>({
    resolver : zodResolver(JoinSchoolValidation),
    defaultValues : {
      code : "",
      userEmail :email ? email : "",
      schoolName : "",
    }
  });
  const submit = (values : z.infer<typeof JoinSchoolValidation>) => {
    console.log(JSON.stringify(values));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField 
         name="schoolName"
         control={form.control}
         render= {({field}) => (
          <FormItem>
            <FormLabel>School name</FormLabel>
            <FormControl>
              <Input type="text" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField 
         name="userEmail"
         control={form.control}
         render= {({field}) => (
          <FormItem>
            <FormLabel>Your email</FormLabel>
            <FormControl>
              <Input {...field} type="email"/>
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         name="code"
         control={form.control}
         render= {({field}) => (
          <FormItem>
            <FormLabel>your Code</FormLabel>
            <FormControl>
              <Input {...field} type="email"/>
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <div>
          <FormMessageError message={error}/>
          <FormMessageSuccess message={success}/>
        </div>
        <div className=" justify-end flex gap-2 mt-2">
          <AlertDialogCancel type="button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction type="submit">
            Send
          </AlertDialogAction>
        </div>
      </form>
    </Form>
  )
}
