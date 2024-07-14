"use server"

import { signIn } from "@/auth";
import { LoginValidation } from "@/validation/loginValidation";
import z from "zod";

export const loginServer = async (
    value : z.infer<typeof LoginValidation>
) => {
    const validation = LoginValidation.safeParse(value);

    if(!validation.success){
        return { error : "Invalid Login Validation"}
    };

    const {username , password} = validation.data;

    const login = async (email : string , password : string) => {
        await signIn("credentials", {
            email : username,
            password,
        })
    };

    if(!login) {
        return {error : "Failed to login"}
    };

    return {success : "Login successful "};
}