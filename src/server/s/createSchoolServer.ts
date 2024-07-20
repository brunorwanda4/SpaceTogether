"use server";
import School from "@/schema/schoolSchema";
import { SchoolValidation } from "@/validation/schoolValidation";
import z from "zod";
import { dbConn } from '@/lib/mongoose';

export const CreateSchoolServer = async (values: z.infer<typeof SchoolValidation>) => {
    const validation = SchoolValidation.safeParse(values);

    if(!validation.success) {
        return { error : "Invalid School Validation" };
    }
    const {email , username , country , province , city ,logo , name , type , description , websiteURL , createdBy , phoneNumber} = validation.data;
    const schoolType = type.map((item: any) => item.value);
    
    try {
        await dbConn();
        
        const findUsername = await School.findOne({
            username : username
        })
        
        if(!!findUsername) {
            return {error  :  "Username already used by other school "};
        }
        
        const findEmail = await School.findOne({
            email : email,
        })

        if(!!findEmail) {
            return {error : "Email already used by other school"};
        }

        const findPhoneNumber = await School.findOne({
            phoneNumber : phoneNumber
        })

        if(!!findPhoneNumber) {
            return {error  :  "Phone number is already used by other school "};
        }

        const newSchool = await School.create({
            name,
            username,
            logo,
            websiteURL,
            type: schoolType,
            province,
            city,
            country,
            description,
            createdAt: new Date(),
            createdBy,
            phoneNumber,
            email
          });
          
          if(!newSchool) {
            return {error : "can not create new School"};
          }

          console.log("School created successfully 🌳🌳 :" + {newSchool});

          return {succuss : " School created successfully"}
    } catch (error : any) {
        console.log("Something went wrong when creating School ❤️❤️ :" ,);
        return {error :  error.message};
    }
};
