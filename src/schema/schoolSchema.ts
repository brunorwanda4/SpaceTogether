import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISchool, TSchoolRequestToJoin } from '@/types/school';
import { boolean } from 'zod';

const SchoolSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [4, "Minimum character length is 4"],
    maxlength: [25, "Maximum character length is 25 characters"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [1, "Minimum character length is 1"],
    maxlength: [50, "Maximum character length is 50 characters"],
    unique: [true, "Username must be unique"],
  },
  logo: {
    type: String,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  province: {
    type: String,
    required: [true, "Province is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
  },
  websiteURL: {
    type: String,
    match: [/^(https?:\/\/)?([\da-z.-]+\.)+[a-z]{2,}$/, "Website URL is invalid"],
  },
  twitter : {
    type : String,
    required: [false, "Twitter is not required"],
    maxlength: [255, "Maximum character length is 23"],
  },
  facebook : {
    type : String,
    required: [false, "facebook is not required"],
    maxlength: [255, "Maximum character length is 23"],
  },
  whatsapp : {
    type : String,
    required: [false, "whatsapp is not required"],
    maxlength: [255, "Maximum character length is 23"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter a valid phone number"],
    minlength: [10, "Minimum character length is 10"],
    maxlength: [23, "Maximum character length is 23"],
    unique: true,
  },
  type: {
    type: [String],
    enum: ["online", "primary", "middle", "vocational", "homeschooling", "boarding", "TVET", "high", "international"],
    required: [true, "Type of school is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Minimum character length is 10"],
    maxlength: [255, "Maximum character length is 255"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "CreatedBy is required"],
  },
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  headerTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

const School: Model<ISchool> = mongoose.models.School || mongoose.model<ISchool>("School", SchoolSchema);

export default School;


const schoolRequestToJoinSchema = new Schema ({
  student_first_name : {
    type : String,
    required : [true , "Student first name required"],
    minle : [1 , "Student first name must be at least 1 character"],
    maxlength : [25 , "Student first name must be at most 25 characters"],
  },
  student_last_name : {
    type : String,
    required : [true , "Student first name required"],
    minlength : [1 , "Student first name must be at least 1 character"],
    maxlength : [25 , "Student first name must be at most 25 characters"],
  },
  student_gender : {
    type : String,
    enum : ["male" , "female" , "other"],
    required : [true , "Student gender required"],
  },
  student_image : {
    type : String,
  },
  student_email : {
    type : String,
    required : [true , "Student email required"],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
  },
  student_birth : {
    type : Date,
    required : [true , "Student birth day required"],
  },
  student_report : {
    type : String,
  },
  parent_name : {
    type : String,
    required : [true , "Parent name required"],
    minlength : [1 , "Parent name must be at least 1 character"],
    maxlength : [50 , "Parent name must be at least 50 characters"],
  },
  parent_email : {
    type : String,
    required : [true , "Parent email required"],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
  },
  parent_phone : {
    type : String,
    required : [true , "Parent phone required"],
    minlength : [10 , "Parent phone must be at least 10 characters"],
    maxlength : [23  , "Parent phone must be at most 23 characters"],
  },
  description : {
    type : String,
    required : [true , "Description required"],
    maxlength : [255 , "Description max length 255 characters"],
  },
  school_id : {
    type : mongoose.Schema.ObjectId,
    ref : "schools",
  },
  sender_id : {
    type : mongoose.Schema.ObjectId,
    ref : "users",
    required : [true , "sender id is required"],
  },
  seen : {
    type : Boolean,
    default : false,
  }
}, {
  timestamps : true
})

export const SchoolRequestToJoin: Model<TSchoolRequestToJoin> = mongoose.models.SchoolRequestToJoin || mongoose.model("SchoolRequestToJoin" , schoolRequestToJoinSchema);