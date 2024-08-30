"use server";

import bcrypt from 'bcryptjs';
import { signIn } from "@/auth";
import clientPromise from "@/lib/db";
import { RegisterValidation } from "@/validation/registerValidation";
import { NextResponse } from "next/server";
import z from "zod";
import { Locale } from '@/i18n';
import { loginServer } from './loginServer';
import { LoginValidation } from '@/validation/loginValidation';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/getUserData';
import { NextURL } from 'next/dist/server/web/next-url';

// export const regServer = async (values : z.infer<typeof RegisterValidation> , lang : Locale , nextUrl : string) => {
//     const validation = RegisterValidation.safeParse(values)

//     if(!validation.success) {
//         return {error : "Invalid Register Validation"}
//     };

//     const {full_name , email , password} = validation.data;

//     const hashPassword = await bcrypt.hash(password , 10);


//     try {


//     const db = (await clientPromise).db();

//     const exitEmail = await db
//     .collection("users")
//     .findOne({email: email});

//     if(!!exitEmail) {
//         return {error : "Email already exists, try other email"}
//     }

    
//     // let avatar : number[] = [1];
//     // let avatarLocation : string = "";

//     //  if (gender === 'male') {
//     //     avatar = [1 ,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,29,3,30,31,];
//     //    avatarLocation = "g"
//     //  } else if (gender === 'female') {
       
//     //     avatar= [1 ,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,29,3,30,31,32,33,34,35,36];
//     //    avatarLocation = "b"
//     //  } else {
//     //     for (let i = 1; i < 9 ; i++) {
//     //         avatar = [1,2,3,4,5,6,7,8,9]
//     //     }
//     //    avatarLocation = "o"
//     //  }

//     //  const inits = Math.floor(Math.random() * avatar.length);
//     //  const image = `/profiles/${avatarLocation}/${avatar[inits]}.png`;

//     const createAccount = db
//     .collection("users")
//     .insertOne({ 
//         email : email,
//         password : hashPassword,
//         full
//     });

//     if(!createAccount) {
//         return {error : "Failed to create account"}
//     }
            
//     return {success : " account created successfully!"};
//     } catch (error : any) {
//         return {error : error.message}
//     }
// }