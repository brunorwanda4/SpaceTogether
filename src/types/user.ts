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
