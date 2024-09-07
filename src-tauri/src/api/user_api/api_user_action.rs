use std::collections::HashMap;
use reqwest::Client;
use crate::{errors::result::CreateUserResult, libs::api_conn::api_conn_st, models::user_model::{UpdateUserModel, UserModel}};
use serde_json::Value;

#[tauri::command]
pub async fn api_user_create_new(user: UserModel) -> CreateUserResult {
    let url = api_conn_st().await;

    let mut user_data = HashMap::new();
    user_data.insert("name", user.name);
    user_data.insert("email", user.email);
    user_data.insert("password", user.password.unwrap());

    let http_client = Client::new();
    let create_user = http_client
        .post(format!("{}/user" , url))
        .json(&user_data)
        .send()
        .await;

    match create_user {
        Ok(res) => {
            if res.status().is_success() {
                if let Ok(json) = res.json::<Value>().await {
                    if let Some(inserted_id) = json["insertedId"]["$oid"].as_str() {
                        return CreateUserResult {
                            success: true,
                            message: format!("{}", inserted_id),
                        };
                    }
                }
                return CreateUserResult {
                    success: false,
                    message: "Failed to parse the response".into(),
                };
            } else if res.status().as_u16() == 406 {
                return CreateUserResult {
                    success: false,
                    message: "Email already exists".into(),
                };
            } else {
                return CreateUserResult {
                    success: false,
                    message: format!("Unexpected server response: {}", res.status()),
                };
            }
        }
        Err(err) => CreateUserResult {
            success: false,
            message: format!("Request failed: {}", err),
        },
    }
}


// update user
#[tauri::command]
pub async fn api_user_update (
    user : UpdateUserModel,
    id : String,
) -> CreateUserResult{
    let url = api_conn_st().await;

    let mut user_data = HashMap::new();
    user_data.insert("image",user.image);
    user_data.insert("gender",user.gender);
    user_data.insert("birth_date",user.birth_date);
    user_data.insert("facebook",user.facebook);
    user_data.insert("twitter",user.twitter);
    user_data.insert("instagram",user.instagram);
    user_data.insert("linkedin",user.linkedin);
    user_data.insert("snapchat",user.snapchat);
    user_data.insert("whatsapp",user.whatsapp);
    user_data.insert("username",user.username);
    user_data.insert("phone_number",user.phone_number);

    let http_client = Client::new();
    let update_user = http_client
    .put(format!("{}/user/{}", url, &id))
    .json(&user_data)
    .send()
    .await;

    match update_user {
        Ok(res) => {
            if res.status().is_success() {
                if  let Ok(json) = res.json::<Value>().await {
                   if let Some (id) = json["_id"]["$oid"].as_str() {
                    return CreateUserResult {
                        success : true,
                        message : format!("{}", id)
                    };
                }
            }
               return CreateUserResult {
                success : false,
                message : "Failed to update user".into(),
               };
            } else if res.status().as_u16() == 400 {
                return CreateUserResult {
                    success : false,
                    message : "This is a bad request".into()
                };
            }
             else {
               return CreateUserResult {
                success : false,
                message : format!("Unexpected server response: {}" , res.status())
               };
           }
        },
        Err(err) => CreateUserResult {
            success : false,
            message : format!("Request failed : {}" , err),
        }
    }
}