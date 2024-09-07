"use server";

import clientPromise from "@/lib/db";
import { t_get_user, t_user, TUser } from "@/types/user";
import { invoke } from "@tauri-apps/api/tauri";
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


export const getUserById = async (id: string | undefined | null): Promise<TUser | null> => {
    if (!id) return null;
    const db = (await clientPromise).db();
    const user = await db
        .collection("users")
        .findOne<TUser>({ _id: new ObjectId(id) });

    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return user;
}

// export const t_get_user_by_id = async (id : string) : Promise<t_user | null | undefined | String> => {
//    try {
//     const user = await invoke<t_get_user>("api_user_data_get", {id})
//     if (user.success) {
//         return user.user;
//     }
//     return user.error
//    } catch (err : any) {
//     return err
//    }
// }