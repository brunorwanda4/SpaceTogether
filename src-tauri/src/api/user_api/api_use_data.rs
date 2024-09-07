use reqwest::StatusCode;

use crate::errors::result::GetUserUserResult;
use crate::libs::api_conn::api_conn_st;
use crate::models::user_model::UserModel;

#[tauri::command]
pub async fn api_user_data_get(id : String) -> GetUserUserResult{
    let url = api_conn_st().await;
    let http_client = reqwest::Client::new();
    let get_user = http_client
        .get(format!("{}/user/{}", url, id))
        .send()
        .await;

    match get_user {
        Ok(res) => {
            if res.status() == StatusCode::OK {
                // Parse the response body into UserModel
                match res.json::<UserModel>().await {
                    Ok(user) => GetUserUserResult {
                        success: true,
                        user: Some(user),
                        error: None,
                    },
                    Err(err) => GetUserUserResult {
                        success: false,
                        user: None,
                        error: Some(format!("Failed to parse user data: {}", err)),
                    },
                }
            } else {
                GetUserUserResult {
                    success: false,
                    user: None,
                    error: Some(format!("Failed to get user: {}", res.status())),
                }
            }
        }
        Err(err) => GetUserUserResult {
            success: false,
            user: None,
            error: Some(format!("Request error: {}", err)),
        },
    }

}