import {z} from "zod";

export const CreateSchoolValidation = z.object({
    name : z.string().max(80 , {
        message : "Maximum characters are 80",
    }).min(4 , {
        message : "Minimum characters are 4",
    }),
    email : z.string().email(),
    logo : z.string(),
    phoneNUmber : z.string(),
    description : z.string().min(1 , {
        message : "Description is required",
    }),
    country : z.string().min(1 , {
        message : "Country is required",
    }),
    province : z.string().min(1 , {
        message : "Province is required",
    }),
    district : z.string().min(1 , {
        message : "District is required",
    }),
})

export const SchoolValidation = z.object({
    name : z.string().min(4 , {
        message : "Minimum characters are 4",
    }).max(25, {
        message : "Maximum characters are 25",
    }),
    username : z.string().min(1 , {
        message : "username are not required",
    }).max(50, {
        message : "maximum characters are 50",
    }).regex(/^[a-zA-Z0-9_]+$/ , {
        message : " username can only contain letters, numbers, and underscores"
    }),
    logo : z.string().min(1 , {
        message : "Logo are required",
    }),
    country : z.string().min(1 , {
        message : "Country is required",
    }),
    province : z.string().min(1 , {
        message : "Province is required",
    }),
    city : z.string().min(1 , {
        message : "city is required",
    }),
    email : z.string().email(),
    websiteURL : z.string().url(),
    phoneNumber : z.string().min(10 , {
        message : "Minimum characters are 10",
    }).max(23 , {
        message : "Maximum characters are 23",
    }),
    type : z.array(z.object({
        value: z.enum(["online", "primary", "middle", "vocational", "homeschooling", "boarding", "TVET", "high", "international"]),
        label: z.string(),
      })).min(1, 'Please select at least one type of school.'),
    description : z.string().min(10 , {
        message : "Minimum characters 10",
    }).max(255 , {
        message : "maximum characters are 255"
    }),
    createdBy : z.string(),
})

export const SchoolContactValidation = z.object({
    phoneNumber : z.string().max(23 , {
        message : "Phone number maximum characters are 23",
    }),
    email : z.string().email(),
    websiteURL : z.string().url(),
    whatsapp : z.string().max(23 , {
        message : "whatsapp number maximum characters are 23",
    }),
    facebook : z.string().max(255 , {
        message : "facebook name maximum characters are 255",
    }),
    twitter : z.string().max(255 , {
        message : "Twitter name maximum characters are 255",
    }),
})

export const SchoolInfoValidation = z.object({
    name : z.string().max(25 , {
        message : "Name maximum characters are 25",
    }),
    username : z.string().max(50 , {
        message : "Username maximum characters are 50",
    }),
    logo : z.string(),
    description : z.string().max(255 , {
        message : "Description maximum characters are 255 "
    }),
    country : z.string().min(1 , {
        message : "Country is required",
    }),
    province : z.string().min(1 , {
        message : "Province is required",
    }),
    city : z.string().min(1 , {
        message : "city is required",
    }),
    type : z.array( z.string()),
})

export const SchoolAskToJoinValidation = z.object({
    stFName : z.string().min(1 , {
        message : "Student first name is required",
    }).max(25 , {
        message : "Maximum characters are 25"
    }),
    student_class : z.string().min(1 , {
        message : "Class you need is required "
    }).max(25 , {
        message : "Maximum characters are 25"
    }),
    stGender : z.enum(["male", "female" , "other"]),
    stImage : z.string(),
    stEmail : z.string().email(),
    stBirthDay: z.string().min(1 , {
        message :"Select a day."
    }),
    stBirthMonth: z.string().min(1 , {
        message : "Select a month." 
    }),
    stBirthYear: z.string().min(4 , {
        message : "Select a year." 
    }),
    prName : z.string().min(1 , {
        message : "Parent name is required "
    }).max(25 , {
        message : "Maximum characters are 25"
    }),
    prPhone : z.string().min(10 , {
        message : "min characters are 10",
    }).max(23 , {
        message : "Maximum characters are 23"
    }),
    prEmail : z.string().email(),
    report : z.string(),
    description : z.string().min(1 , {
        message : "Why do you want to join our school?"
    }),
})

export const SchoolClassValidation = z.object({
    name : z.string().min(1 , {
        message : "Please enter class name "
    }).max(25 , {
        message : "maximum characters are 25"
    }),
    username : z.string().min(1 , {
        message : "username is required"
    }).max(15 , {
        message : "maximum characters are 15"
    }).regex(/^[a-zA-Z0-9_]+$/ , {
        message : "Username must contain only alphanumeric characters and underscores",
    }),
    category : z.string().min(1 , {
        message : "Training is required",
    }).max(15 , {
        message : "maximum characters are 15"
    }),
})

export const JoinSchoolValidation = z.object({
    schoolName : z.string().min(1 , {
        message : "school name is required",
    }).max(50 , {
        message : "school name max characters are 50"
    }),
    userEmail : z.string().email().min(1 , {
        message : "User email is required",
    }),
    code : z.string().min(1 , {
        message : "Code is required",
    })
})