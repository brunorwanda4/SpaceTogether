"use server"

import { FindSchoolById, FindSchoolByUsername } from "@/data/getSchool"
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

/**
 * get school by id
 * @param id 
 * @returns 
 * @type {ISchool}
 */

export const getSchoolById = async (id: string) : Promise<ISchool | null> => {
    return await FindSchoolById(id);
}