import { boolean } from 'zod';
export interface TUser {
    _id: string;
    name: string;
    email: string;
    image : string;
    password: string;
    role : "direct" | "teacher" | "student"
    gender ?: "male" | "female" | "other";
}

export type TURole = "direct" | "teacher" | "student"

export interface IUser {
    id  ?: string,
    name : string,
    email : string,
    password ?: string,
    gender ?: string,
    image ?: string,
    birth_date ?: string,
}
export interface t_user {
    id?: ObjectId;      // Handling MongoDB ObjectId as a nested object
    name: string;
    email: string;
    password?: string;
    gender?: "Male" | "Female" | "Other";
    image?: string;
    birth_date?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    snapchat?: string;
    whatsapp?: string;
    username?: string;
    phone_number?: string;
    created_at?: string;
    updated_at?: string | null;
  }
  
  // Wrapper for MongoDB ObjectId structure
  export interface ObjectId {
    $oid: string;  // Represents the MongoDB ObjectId string
  }
  
export interface t_get_user {
    success : boolean,
    user ?: t_user,
    error ?: string,
}