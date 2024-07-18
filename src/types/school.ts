import { Document, ObjectId } from 'mongoose';

export interface ISchool extends Document {
  name: string;
  username: string;
  logo: string;
  country: string;
  province: string;
  city: string;
  email: string;
  websiteURL: string;
  phoneNumber: string;
  type: string[];
  description: string;
  createdBy: ObjectId;
  classes: ObjectId[];
  students: ObjectId[];
  teachers: ObjectId[];
  headerTeacher: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
