import bcrypt from 'bcryptjs';
import { RegisterValidation } from "@/validation/registerValidation";
import z from "zod";

export const create_user = async (value: z.infer<typeof RegisterValidation>) => {
    const validation = RegisterValidation.safeParse(value);

    if (!validation.success) {
        return { error: "Register validation failed" };
    }

    const { name, password, email } = validation.data;

    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const api = process.env.NEXT_PUBLIC_SPACETOGETHER_APIS;

        if (!api) {
            return { error: "Space Together API is required! 😔" };
        }

        const res = await fetch(`${api}/user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password: hashPassword,
                email
            }),
            // Temporary workaround for CORS in development only
            // mode: 'no-cors'
        });

        if (!res.ok) {
            // Check if response is JSON to get the error message
            try {
                const error_message = await res.json();
                return { error: error_message };
            } catch (error) {
                return { error: "Failed to create account, server error occurred." };
            }
        }

        const data = await res.json();

        // Assuming the API response is:
        // { "insertedId": { "$oid": "66d16f6ccc107fad81de92e8" } }
        const insertedId : string = data.insertedId?.$oid;

        if (!insertedId) {
            return { error: "User creation succeeded, but no ID was returned." };
        }

        return { success: `Account created successfully! 🌳${insertedId}`,  };
    } catch (error: any) {
        console.log(error);
        return { error: `Something went wrong: ${error.message}` };
    }
};
