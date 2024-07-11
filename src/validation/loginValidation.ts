import z from "zod";

export const LoginValidation = z.object({
    username : z.string().min(1 , {
        message : "Username or email are required"
    }),
    password : z.string().min(8 , {
        message : "Password is required"
    }),
})