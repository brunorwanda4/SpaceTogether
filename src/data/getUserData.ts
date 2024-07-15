"use server";

import clientPromise from "@/lib/db";
import { TUser } from "@/types/user";
import { ObjectId } from "mongodb";

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

export const getUserById = async (id: string): Promise<TUser | null> => {
    const db = (await clientPromise).db();
    const user = await db
        .collection("users")
        .findOne<TUser>({ _id: new ObjectId(id) });

    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return user;
}