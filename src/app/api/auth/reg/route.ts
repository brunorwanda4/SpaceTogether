import clientPromise from "@/lib/db";
import { RegisterValidation } from "@/validation/registerValidation";
import { NextResponse } from "next/server";
import z from "zod";

export const POST = async (values : z.infer<typeof RegisterValidation>) => {
    const validation = RegisterValidation.safeParse(values)

    if(!validation.success) {
        return NextResponse.json({message : "Invalid Register Validation"} , {status : 404})
    };

    const { email, password, LName, FName,  gender, day, month, year } = validation.data;

    const birthDate = new Date(`${year}-${month}-${day}`);

    try {
    const db = (await clientPromise).db();

    const createAccount = db
    .collection("users")
    .insertOne({ 
        email : email,
        password : password,
        LName : LName,
        FName : FName,
        gender : gender,
        birthDate : birthDate,
    })
    
    return NextResponse.json({createAccount})
    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}