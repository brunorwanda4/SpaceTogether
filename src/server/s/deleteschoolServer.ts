"use server";

import { dbConn } from "@/lib/mongoose";
import School from "@/schema/schoolSchema";

export const DeleteSchoolServer = async (id : string | unknown) => {
    if (!id) {
        return {error : "school id not specified"};
    }
    
    try {
        await dbConn();

        const deleteSchool = await School.findByIdAndDelete({_id : id});

        if (!deleteSchool) {
            return {error : "School not found"};
        }
        return {success : "School deleted successfully"};
    } catch (error : any) {
        return {error : error.message};
    }
}