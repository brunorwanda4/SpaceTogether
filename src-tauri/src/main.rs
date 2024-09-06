// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use std::fmt::format;

use mongodb::bson::doc;
use serde::Serialize;

// my functions
use crate::api::user_api::api_user_action::{api_user_create_new , api_user_update};
use crate::api::user_api::api_use_data::api_user_data_get;

use crate::api::school_api::class_api::class_action::class_action_insert_new;
use crate::handlers::school_handlers::class_handlers::handler_class_action::handler_class_insert_new;

// folders
mod server;
mod models;
mod libs;
mod api;
mod handlers;
mod errors;
// pages;

#[derive(Serialize)]
struct MongoDBResponse {
    success: bool,
    message: String,
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        class_action_insert_new,
        // api_user_authentication_create,
        api_user_data_get,
        handler_class_insert_new,
        api_user_create_new,
        api_user_update,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
