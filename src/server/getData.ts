"use server"

import { FindSchoolByUsername } from "@/data/getSchool"
import { ISchool } from "@/types/school"

/**
 * get school by username
 * @param username 
 * @returns 
 * @type {ISchool}
 */

export const getSchoolByUsername = async (username: string) : Promise<ISchool | null> => {
    return await FindSchoolByUsername(username);
}