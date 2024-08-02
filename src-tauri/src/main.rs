// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use std::fmt::format;

// use std::fs;
use mongodb::bson::doc;
// use tauri::{generate_handler, Manager};
use serde::Serialize;


// import pages;
mod server;
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
                    message: "User data insert successfully.".to_string(),
                },
                Err(e) => MongoDBResponse {
                    success: false,
                    message: format!("Failed to insert user data: {}", e),
                },
            }
        },
        Err(e) => MongoDBResponse {
            success: false,
            message: format!("Failed to connect to MongoDB: {}", e),
        },
    }
}

#[tauri::command]
async fn insert_school_member(member : models::SchoolMember) ->MongoDBResponse {
    match libs::connect_to_mongodb().await {
        Ok(client) => {
            match server::insert_school_member(&client, member).await {
                Ok(_) => MongoDBResponse{
                    success : true,
                    message: "School member was successfully inserted".to_string(),
                },
                Err(err) => MongoDBResponse{
                    success : false,
                    message : format!("Failed to insert member in storage error is : {}", err)
                }
            }
        }
        Err(err) => MongoDBResponse{
            success : false,
            message : format!("Failed to connect to MongoDB: {}", err)
        }
    }

}

#[tauri::command]
async fn insert_class(class: models::school_class) -> MongoDBResponse {
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


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        insert_use,
        insert_school_member,
        insert_class,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
