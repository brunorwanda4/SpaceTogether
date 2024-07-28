use zod::{string, ZodSchema};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct ask_to_join_school_validation {
    stFName: String,
    stLName: String,
    stGender: String,
    stImage: String,
    stEmail: String,
    stBirthDay: String,
    stBirthMonth: String,
    stBirthYear: String,
    prName: String,
    prPhone: String,
    prEmail: String,
    report: String,
    description: String,
}

impl ask_to_join_school_validation {
    fn schema() -> ZodSchema {
        ZodSchema::new()
            .field("stFName", string().min(1).max(25))
            .field("stLName", string().min(1).max(25))
            .field("stGender", string().enumeration(&["male", "female", "other"]))
            .field("stImage", string())
            .field("stEmail", string().email())
            .field("stBirthDay", string().min(1))
            .field("stBirthMonth", string().min(1))
            .field("stBirthYear", string().min(4))
            .field("prName", string().min(1).max(25))
            .field("prPhone", string().min(1).max(23))
            .field("prEmail", string().email())
            .field("report", string())
            .field("description", string().min(1))
    }
}
