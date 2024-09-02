import { z } from 'zod';

export const RegisterValidation = z.object({
    name: z.string().min(3, {
        message: "Minimum characters are 3"
    }).max(25, {
        message : "Maximum characters are 25"
    }),
    password: z.string().min(8, {
        message: "Password is required, minimum characters are 8"
    }),
    confirmPassword: z.string(),
    email : z.string().email({message : "Email is required"}),
}).refine(data => data.password === data.confirmPassword , {
    path : ["confirmPassword"],
    message : "Password must be matches",
});
