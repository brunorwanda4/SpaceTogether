use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize , Debug)]
pub struct CreateUserResult {
    pub success : bool,
    pub message : String,
}