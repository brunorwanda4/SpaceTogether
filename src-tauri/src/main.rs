// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use mongodb::bson::doc;
use tauri::{generate_handler, Manager};
use serde::Serialize;


// import pages;
mod api;
mod models;
mod libs;

#[derive(Serialize)]
struct MongoDBResponse {
    success: bool,
    message: String,
}

#[tauri::command]
async fn insert_use(user: models::User) -> MongoDBResponse {
    match libs::connect_to_mongodb().await {
        Ok(client) => {
            match libs::insert_user(&client, user).await {
                Ok(_) => MongoDBResponse {
                    success: true,
                    message: "User data updated successfully.".to_string(),
                },
                Err(e) => MongoDBResponse {
                    success: false,
                    message: format!("Failed to update user data: {}", e),
                },
            }
        },
        Err(e) => MongoDBResponse {
            success: false,
            message: format!("Failed to connect to MongoDB: {}", e),
        },
    }
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![insert_use])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// #[tauri::command]
// fn save_file(path: String, contents: String) {
//   print!("path of school : {} , ask school place info : {} ," , path, contents);
//     fs::write(path, contents).unwrap();
//     api::ask_to_join_school_api();
// }