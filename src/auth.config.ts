import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import { LoginValidation } from "./validation/loginValidation";
import { getUserByEmail, getUserByUsername } from "./data/getUserData";
 
export default { providers: [
    GitHub,
    Google,
    Credentials({
        async authorize(credentials) {
            const validation = LoginValidation.safeParse(credentials);

            if (!validation.success) {
                throw new Error("Invalid Login Validation");
            }

            try {
                const {username , password} = validation.data;

                const user = await getUserByEmail(username) || await getUserByUsername(username);

                if(!user) {
                    throw new Error("User not found");
                };

                 // Validate the password
                 const passwordMatch = await bcrypt.compare(password, user.password);
                 if (!passwordMatch) {
                    throw new Error("Invalid Password");
                 }

                 return user                
            } catch (error : any) {
                throw new Error(error.message + "Login Failed with credentials");
            }
        }
    })
], 
secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig