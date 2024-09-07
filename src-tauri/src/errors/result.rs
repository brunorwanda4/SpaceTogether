use serde::{Deserialize, Serialize};

use crate::models::user_model::UserModel;

#[derive(Serialize, Deserialize , Debug)]
pub struct CreateUserResult {
    pub success : bool,
    pub message : String,
}

#[derive(Serialize, Deserialize , Debug)]
pub struct GetUserUserResult {
    pub success : bool,
    pub user : Option<UserModel>,
    pub error : Option<String>,
}