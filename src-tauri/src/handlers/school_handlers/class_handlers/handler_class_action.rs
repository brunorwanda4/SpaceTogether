use crate::{libs, models, server, MongoDBResponse};

#[tauri::command]
pub async fn handler_class_insert_new(class: models::SchoolClass) -> MongoDBResponse {
    match libs::connect_to_mongodb().await {
        Ok(client) => {
            match server::insert_class(&client, class).await {
                Ok(_) => MongoDBResponse {
                    success: true,
                    message: "Class inserted successfully.".to_string(),
                },
                Err(e) => MongoDBResponse {
                    success: false,
                    message: format!("Failed to insert class: {}", e),
                },
            }
        },
        Err(e) => MongoDBResponse {
            success: false,
            message: format!("Failed to connect to MongoDB: {}", e),
        },
    }
}