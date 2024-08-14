"use server";

import clientPromise from "@/lib/db";
import { TUser } from "@/types/user";
import { ObjectId } from "mongodb";

export const getUserByEmail = async (email : string | null | undefined): Promise<TUser | null> => {
    const db = (await clientPromise).db();
    const user = await db
    .collection("users")
    .findOne<TUser>({ email: email});

    if (!user) {
        return null;
    };
    
    return user
}

export const getUserByUsername = async (username : string | null | undefined): Promise<TUser | null> => {
    const db = (await clientPromise).db();
    const user = await db
    .collection("users")
    .findOne<TUser>({ name: username});

    if(!user) {
        return null;
    }

    return user
}

export const getUserByEmailOrUsername = async (username : string | null | undefined): Promise<TUser | null> => {
    const db = (await clientPromise).db();
    const user = await db
    .collection("users")
    .findOne<TUser>({ name: username});

    if(!!user) {
        return user;
    }else {
        const user = await db
        .collection("users")
        .findOne<TUser>({ email: username})
        if (!user) return null;
        return user;
    }
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