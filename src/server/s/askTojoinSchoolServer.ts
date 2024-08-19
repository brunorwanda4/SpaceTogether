"use server";
import { dbConn } from "@/lib/mongoose";
import { SchoolRequestToJoin } from "@/schema/schoolSchema";
import { ISchool } from "@/types/school";
import { TUser } from "@/types/user";
import { SchoolAskToJoinValidation } from "@/validation/schoolValidation";
import z from "zod";

export const AskToJoinSchoolServer = async (values : z.infer<typeof SchoolAskToJoinValidation> , school : ISchool , user_id : string | undefined) => {

    if(!user_id) {
        return {error : "User not found"};
    }

    const validation = SchoolAskToJoinValidation.safeParse(values);

    if (!validation.success) {
        return {error : "validation failed"};
    };

    const {stBirthDay , stBirthMonth , stBirthYear , stEmail ,stFName ,stGender ,stImage ,stLName , prEmail ,prName ,prPhone , report , description } = validation.data;

    const student_birth = new Date(`${stBirthYear}-${stBirthMonth}-${stBirthDay}`)

    try {
        await dbConn();

        const sendRequest = await SchoolRequestToJoin.create({
            student_first_name : stFName,
            student_last_name : stLName,
            student_gender : stGender,
            student_image : stImage,
            student_birth : student_birth,
            student_email : stEmail,
            student_report : report,
            parent_name : prName,
            parent_email : prEmail,
            parent_phone : prPhone,
            description,
            school_id : school._id,
            sender_id  : user_id
        })

        if (!!sendRequest) {
            return { success : "Request have been sent successfully , you will have feedback on your Parents email or student email"};
        }
    } catch (error : any) {
        console.error("Some thing went #%d :" + error);
        return {error : error.message}
    }

}