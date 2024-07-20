import { z } from 'zod';

export const RegisterValidation = z.object({
    FName: z.string().min(3, {
        message: "Minimum characters are 3"
    }).max(25, {
        message : "Maximum characters are 25"
    }),
    LName: z.string().min(3, {
        message: "Minimum characters are 3"
    }).max(25, {
        message : "Maximum characters are 25"
    }),
    password: z.string().min(8, {
        message: "Password is required, minimum characters are 8"
    }),
    gender: z.enum(["male", "female", "other"]),
    email : z.string().email({message : "Email is required"}),
    day: z.string().min(1 , {
        message :"Select a day."
    }),
    month: z.string().min(1 , {
        message : "Select a month." }),
    year: z.string().min(4 , {
        message : "Select a year." }),
});
