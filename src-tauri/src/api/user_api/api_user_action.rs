use std::collections::HashMap;
use reqwest::Client;
use crate::{errors::result::CreateUserResult, libs::api_conn::api_conn_st, models::user_model::UserModel};
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
        .post(url.to_owned() + "/user")
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
                            message: format!("User created with ID: {}", inserted_id),
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