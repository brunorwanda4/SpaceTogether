"use server";

import clientPromise from "@/lib/db";
import { TUser } from "@/types/user";

export const getUserByEmail = async (email : string): Promise<TUser | null> => {
    const db = (await clientPromise).db();
    const user = await db
    .collection("users")
    .findOne<TUser>({ email: email});

    if (!user) {
        throw new Error(`User ${email} not found`)
    };
    
    return user
}

export const getUserByUsername = async (username : string): Promise<TUser | null> => {
    const db = (await clientPromise).db();
    const user = await db
    .collection("users")
    .findOne<TUser>({ name: username});

    if(!user) {
        throw new Error(`User ${username} not found`)
    }

    return user
}