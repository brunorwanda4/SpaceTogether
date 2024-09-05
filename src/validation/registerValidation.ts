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

export const OnboardingValidation = z.object({
    image : z.string(),
    phoneNumber : z.string().min(10 , {
        message : "Minimum characters 10"
    }).max(23, {
        message : "Maximum characters 23"
    }),
    username : z.string(),
    gender : z.enum(["male" , "female" , "other"]),
    // birth day
    day : z.string().min(1, {
        message : "Day is required"
    }),
    month : z.string().min(1, {
        message : "Day is required"
    }),
    year : z.string().min(1, {
        message : "Day is required"
    }),
})