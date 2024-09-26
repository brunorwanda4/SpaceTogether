import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import { LoginValidation } from "./validation/loginValidation";
import { getUserByEmail, getUserByEmailOrUsername, getUserByUsername } from "./data/getUserData";
 
export default { providers: [
    GitHub({
        clientId : process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google,
    Credentials({
        async authorize(credentials) {
            const validation = LoginValidation.safeParse(credentials);

            if (validation.success) {
                const {username , password} = validation.data;
                const user = await getUserByEmailOrUsername(username);
                if (!user || !user.password) return null;
                const passwordMatch = await bcrypt.compare(password, user.password);
                
                if (passwordMatch) return user;

            }

            return null;
        }
    })
], 
} satisfies NextAuthConfig