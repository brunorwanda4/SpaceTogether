"use server"

import { signIn } from "@/auth";
import { getUserByEmail, getUserByEmailOrUsername, getUserByUsername } from "@/data/getUserData";
import { Locale } from "@/i18n";
import { LoginValidation } from "@/validation/loginValidation";
import z from "zod";
import { AuthError } from "next-auth";

export const loginServer = async (
    value : z.infer<typeof LoginValidation> , lang : Locale
) => {
    const validation = LoginValidation.safeParse(value);

    if(!validation.success){
        return { error : "Invalid Login Validation"}
    };

    const {username , password} = validation.data;

   try {
    const exitUser = await getUserByEmailOrUsername(username);

    if(!exitUser){
        return { error : " You don't have any account"};
    }


    const login = await signIn("credentials", {
        username,
        password,
        redirectTo : `/${lang}/s`
    })

    if (login) {
        return {success : "Login successful "};
    } else {
        return {error : " Something went wrong"};
    }

   } catch (error : any) {
    if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Some thing went wrong!" };
        }
      }
      throw error;
   }
}