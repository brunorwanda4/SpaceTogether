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
