"use server"
import { dbConn } from "@/lib/mongoose"
import School from "@/schema/schoolSchema"
import { SchoolContactValidation } from "@/validation/schoolValidation"
import z from "zod"

export const UpdateSchoolContactServer = async (
    values : z.infer<typeof SchoolContactValidation> , schoolId : string | unknown
) => {
    if (!schoolId) {
        return {error : "school id is required"}
    }
    const validation = SchoolContactValidation.safeParse(values)

    if(!validation.success) {
        return { error : "Invalid School Contact Validation" }
    };

    const {email , phoneNumber , websiteURL , facebook , whatsapp , twitter} = validation.data;

    try {
        await dbConn()

        const updateSchool = await School.findByIdAndUpdate({_id : schoolId },
            {
                email : email,
                phoneNumber : phoneNumber,
                websiteURL : websiteURL ,
                facebook : facebook,
                whatsapp : whatsapp,
                twitter : twitter
            })

        if(!updateSchool) {
            return {error : "Can not update school contact information"};
        }

        return {success : "School Contact update Successfully"}
    } catch (error : any) {
        console.log("Something went wrong when creating School ❤️❤️ :" , error);
        return {error :  error.message};
    }
}