import { z } from 'zod';

export const RegisterValidation = z.object({
    FName: z.string().min(3, {
        message: "First name is required, minimum characters are 3"
    }),
    LName: z.string().min(3, {
        message: "Last name is required, minimum characters are 3"
    }),
    password: z.string().min(8, {
        message: "Password is required, minimum characters are 8"
    }),
    gender: z.enum(["male", "female", "other"]),
    email : z.string().email({message : "Email is required"}),
    day: z.string().min(1 , {
        message :"Please select a day."
    }),
    month: z.string().min(1 , {
        message : "Please select a month." }),
    year: z.string().min(1 , {
        message : "Please select a year." }),
});
