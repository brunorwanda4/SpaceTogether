import { dbConn } from "@/lib/mongoose";
import School, { SchoolRequestToJoin } from "@/schema/schoolSchema";
import { ISchool, TSchoolRequestToJoin } from "@/types/school";

export const FindSchoolByOwn = async (id: string |null | undefined): Promise<ISchool[] | null> => {
    if (!id) {
        return null;
    }
    await dbConn();
    const school = await School.find<ISchool>({ createdBy: id });

    if (!school) {
        return null;
    }

    if (school.length === 0) {
        return null;
    }

    return school;
};

 export const FindSchoolByUsername = async (username : string) => {
    if (!username) return null;

    await dbConn();
    const school = await School.findOne<ISchool>({ username });

    if (!school) {
        return null;
    }
    return school;
};

export const  FindSchoolById = async ( id : string ) => {
    if (id) return null;

    await dbConn();
    
    const school = await School.findById<ISchool>({_id : id});

    if (!school) return null;

    return school;
}

export const getSchoolsPaid = async () : Promise<ISchool[] | null > => {

    await dbConn();

    const schools = await School.find<ISchool>()

    if (!schools) {
        return null;
    }

    if (schools.length === 0) {
        return null;
    }

    return schools
}

export const getSchoolRequest = async (id : string) : Promise<TSchoolRequestToJoin [] | null> => {

    try {
        await dbConn();

        const request = await SchoolRequestToJoin.find<TSchoolRequestToJoin>({school_id : id});
        
        return request
    } catch (error : any) {
        console.log("error" + error)
        return null
    }

}