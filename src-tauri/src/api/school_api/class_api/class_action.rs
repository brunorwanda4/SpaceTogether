use crate::{errors::result::ResReq, libs, models::class::class_model::SchoolClass, server};

#[tauri::command]
pub async fn class_action_insert_new(class: SchoolClass) -> ResReq {
    match libs::connect_to_mongodb().await {
        Ok(client) => {
            match server::insert_class(&client, class).await {
                Ok(_) => ResReq {
                    success: true,
                    message: "Class inserted successfully.".to_string(),
                },
                Err(e) => ResReq {
                    success: false,
                    message: format!("Failed to insert class: {}", e),
                },
            }
        },
        Err(e) => ResReq {
            success: false,
            message: format!("Failed to connect to MongoDB: {}", e),
        },
    }
}