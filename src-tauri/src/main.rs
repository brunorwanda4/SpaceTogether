// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

mod api;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn save_file(path: String, contents: String) {
  print!("path of school : {} , ask school place info : {} ," , path, contents);
    fs::write(path, contents).unwrap();
    api::ask_to_join_school_api();
}