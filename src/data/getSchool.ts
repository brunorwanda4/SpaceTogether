import { dbConn } from "@/lib/mongoose";
import School from "@/schema/schoolSchema";
import { ISchool } from "@/types/school";

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
    if (!username) {
        throw new Error("Username must be provided");
    }

    await dbConn();
    const school = await School.findOne<ISchool>({ username });

    if (!school) {
        return null;
    }
    return school;
};

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