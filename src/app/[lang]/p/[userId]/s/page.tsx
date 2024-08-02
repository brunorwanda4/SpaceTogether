"use client";

// import { useState } from 'react';
// import { invoke } from '@tauri-apps/api/tauri';
// import { FormMessageSuccess } from '@/components/auth/form/formMessagers';
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { z } from "zod";
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// const userSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   age: z.number().min(1, { message: "Age must be a positive number" })
// });

// type User = z.infer<typeof userSchema>;

// export default function Home() {
//   const [message, setMessage] = useState<string | undefined>('');

//   const { register, handleSubmit, formState: { errors } } = useForm<User>({
//     resolver: zodResolver(userSchema)
//   });

//   const onSubmit = async (data: User) => {
//     try {
//       const response = await invoke<{ message: string }>('insert_use', { user: data });
//       if (response) {
//         setMessage(response.message);
//       }
//     } catch (error) {
//       console.error('Failed to update user data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Update User</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>
//             Name:
//             <input className='input input-info' type="text" {...register("name")} />
//             {errors.name && <span>{errors.name.message}</span>}
//           </label>
//         </div>
//         <div>
//           <label>
//             Email:
//             <input className='input input-info' type="email" {...register("email")} />
//             {errors.email && <span>{errors.email.message}</span>}
//           </label>
//         </div>
//         <div>
//           <label>
//             Age:
//             <input className='input input-info' type="number" {...register("age", { valueAsNumber: true })} />
//             {errors.age && <span>{errors.age.message}</span>}
//           </label>
//         </div>
//         <FormMessageSuccess message={message} />
//         <button type="submit" className='btn'>Update User</button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FormMessageError, FormMessageSuccess } from '@/components/auth/form/formMessagers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'; // Adjust the import based on your project structure
import { SchoolClassValidation } from '@/validation/schoolValidation';

const formValidation = z.object({
  name: z.string().nonempty("Name is required"),
  category: z.string(),
  username: z.string()
});
type FormData = z.infer<typeof formValidation>;

export default function Home() {
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");

  const form = useForm<FormData>({
    resolver: zodResolver(SchoolClassValidation),
    defaultValues: {
      name: "",
      category: "",
      username: "",
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: 'firstError',
  });

  const onSubmit = async (data: z.infer<typeof SchoolClassValidation>) => {
    try {
      const response = await invoke<{ message: string , success : boolean}>('insert_class', { class: data });
      if (response.success) {
        setSuccess(response.message);
      }
    } catch (error : any) {
      setError(error)
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
                  <Input type="text" {...field} className="input input-info" />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="input input-info" />
                </FormControl>
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
                  <Input type="text" {...field} className="input input-info" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <FormMessageSuccess message={success} />
        <FormMessageError message={error} />
        <div className="flex justify-end mt-2 items-center gap-2">
          <button type="submit" className="btn btn-lg">class</button>
        </div>
      </form>
    </Form>
  );
}

// onChange={(e) => field.onChange(Number(e.target.value))} 