import { TUser } from './user';
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
  facebook ?: string;
  twitter ?: string;
  whatsapp ?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TSchoolWithUser extends Omit<ISchool, 'createdBy'> {
  createdBy: TUser | null;
}

export interface TClass {
  name : string;
  username : string;
  category : "online" | "primary" | "middle" | "vocational" | "homeschooling" | "boarding" | "TVET" | "high" | "international"
}