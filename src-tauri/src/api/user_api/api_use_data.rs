use crate::libs::api_conn::api_conn_st;
use crate::models::user_model::UserModel;

use crate::errors::errors::Result;

#[tauri::command]
pub async fn api_user_data_get(id : String) -> Result<UserModel>{
    let url = api_conn_st().await;
    let http_client = reqwest::Client::new();
    let get_user = http_client
        .get(url.to_owned() + "/user" + &id)
        .send()
        .await
        .unwrap();

    let user_json = get_user.json::<UserModel>().await.unwrap();

    Ok(user_json)
}