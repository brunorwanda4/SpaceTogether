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

export const regServer = async (values : z.infer<typeof RegisterValidation> , lang : Locale) => {
    const validation = RegisterValidation.safeParse(values)

    if(!validation.success) {
        return {error : "Invalid Register Validation"}
    };

    const { email, password, LName, FName,  gender, day, month, year } = validation.data;

    const birthDate = new Date(`${year}-${month}-${day}`);

    const hashPassword = await bcrypt.hash(password , 10);

    const name = FName + "_" + LName

    try {
    const db = (await clientPromise).db();

    const exitEmail = await db
    .collection("users")
    .findOne({email: email});

    if(!!exitEmail) {
        return {error : "Email already exists, try other email"}
    }

    const createAccount = db
    .collection("users")
    .insertOne({ 
        email : email,
        password : hashPassword,
        LName : LName,
        FName : FName,
        gender : gender,
        birthDate : birthDate,
        name : name,
    });

    if(!createAccount) {
        return {error : "Failed to create account"}
    }

    const login = await signIn("credentials", {
        username : email,
        password,
        redirectTo : `/${lang}/s`
    })

    if (!login) {
        return {error : "Failed to login "};
    }

    return {success : " account created successfully , Login successful!"};
    } catch (error : any) {
        return {error : error.message}
    }
}