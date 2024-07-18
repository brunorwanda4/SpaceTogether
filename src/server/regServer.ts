"use server";

import bcrypt from 'bcryptjs';
import { signIn } from "@/auth";
import clientPromise from "@/lib/db";
import { RegisterValidation } from "@/validation/registerValidation";
import { NextResponse } from "next/server";
import z from "zod";

export const regServer = async (values : z.infer<typeof RegisterValidation>) => {
    const validation = RegisterValidation.safeParse(values)

    if(!validation.success) {
        return {error : "Invalid Register Validation"}
    };

    const { email, password, LName, FName,  gender, day, month, year } = validation.data;

    const birthDate = new Date(`${year}-${month}-${day}`);

    const hashPassword = await bcrypt.hash(password , 10)

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
    });

    if(!createAccount) {
        return {error : "Failed to create account"}
    }

    const login = async (email : string , password : string) => {
        await signIn("credentials", {
            email,
            password,
        })
    };

    if(!login) {
        return {error : "Failed to login"}
    }

    return {success : " account created successfully && Login successful "};

    } catch (error : any) {
        return {error : error.message}
    }
}