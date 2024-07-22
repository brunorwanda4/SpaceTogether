"use server";
import School from "@/schema/schoolSchema";
import { SchoolInfoValidation, } from "@/validation/schoolValidation";
import z from "zod";
import { dbConn } from '@/lib/mongoose';

export const UpdateSchoolInfoServer = async (
    values: z.infer<typeof SchoolInfoValidation> , schoolId : string | unknown
) => {
    if (!schoolId) {
        return {error: "School id required "};
    }
    
    const validation = SchoolInfoValidation.safeParse(values);

    if(!validation.success) {
        return { error : "Invalid School Validation" };
    }
    const {logo , name , username , description , country , province , city} = validation.data;
    
    try {
        await dbConn();

        const updateSchoolInfo = await School.findByIdAndUpdate({_id : schoolId} , {
            name : name, 
            username : username, 
            logo : logo, 
            description : description, 
            city : city,
            country : country, 
            province : province,
        })

        if(!updateSchoolInfo) {
            return {error: "School info can not be updated"};
        }

        return {success : " School created successfully" , schoolUsername : {username}}
    } catch (error : any) {
        console.log("Something went wrong when creating School ❤️❤️ :" ,);
        return {error :  error.message};
    }
};
