import { SchoolValidation } from "@/validation/schoolValidation"
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

import z from "zod"
import clientPromise from "@/lib/db";
import mongoose from "mongoose";
import School from "@/schema/schoolSchema";

const POST = async (req : Request , res: NextApiResponse) => {
    const validation = SchoolValidation.safeParse(req.body);

    if(!validation.success) {
       return NextResponse.json({error: "Invalid school validation" ,details: validation.error.errors} , {status : 401})
    }

    const { name, username, logo, websiteURL, type, province, city, country, description, createdBy }= validation.data;

    try {
        await clientPromise;
        const db = mongoose.connection;

        const schoolType = type.map((item: any) => item.value);

        const newSchool = new School({
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
          });

          const createSchool = await newSchool.save();

          if (!createSchool) {
            return NextResponse.json({ error: 'Something went wrong creating the school' } , {status : 404,});
          }

          return NextResponse.json({ success: 'School created successfully', data: createSchool });
    } catch (error : any) {
        console.error('Something went wrong creating the school', error);
        return NextResponse.json({ error: 'Something went wrong creating the school' });
      }

}


export {
    POST,
}