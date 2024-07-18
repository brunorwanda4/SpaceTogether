import z from "zod";

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
        value: z.string(),
        label: z.string(),
      })).min(1, 'Please select at least one color.'),
    description : z.string().min(10 , {
        message : "Minimum characters 10",
    }).max(255 , {
        message : "maximum characters are 255"
    })
})