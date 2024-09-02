use dotenv::dotenv;
use reqwest::{header::CONTENT_LENGTH , Client};
use std::env;

use crate::models::user_model::UserModel;
use crate::errors::Result;
#[tauri::command]
pub async fn api_user_authentication_create(user : UserModel) -> Result<UserModel>{
   
    let http_client = Client::new();
    // let create_user = client
    //    .post(api.clone() + "/user")
    //    .header(CONTENT_LENGTH, 50)
    //    .body(user);
    
   todo!();
}