import bcrypt  from 'bcryptjs';
import { RegisterValidation } from "@/validation/registerValidation";
import z from "zod";

export const create_user = async (value : z.infer<typeof RegisterValidation>) => {
    const validation = RegisterValidation.safeParse(value);

    if (!validation.success) return {error : "Register validation failed "};

    const {name , password , email} = validation.data;
    try {
        const hashPassword = await bcrypt.hash(password , 10);

        const api = process.env.NEXT_PUBLIC_SPACETOGETHER_APIS;

        if (!api) return {error : " Space Together API is required! 😔"};

        const res = await fetch (`${api}/user`, {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                name,
                password : hashPassword,
                email
            })
        });

        // const res_ = await res.json();

        if (!res.ok) {
            const error_message = await res.json();
            return { error : error_message };
        };

        return {success : "Account created successfully!"};
    } catch (error : any) {
        console.log(error);
        return {error : `Some thing went wong : ${error.message}`}
    }
}
