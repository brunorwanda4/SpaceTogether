#![allow(unused)]

use core::num;

use serde::{Serialize, Deserialize};
use mongodb::bson::{doc, Document, Bson};

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub name: String,
    pub email: String,
    pub age: i32,
}

impl User {
    pub fn to_document(&self) -> Document {
        doc! {
            "name": &self.name,
            "email": &self.email,
            "age": &self.age,
        }
    }
}

// school member
#[derive(Serialize, Deserialize , Debug)]
pub struct SchoolMember {
    pub name: String,
    pub email: String,
    pub role: String,
    pub user_id: String,
    pub classes: Vec<String>,
}


impl SchoolMember {
    pub fn to_document(&self) -> mongodb::bson::Document {
        doc! {
            "user_id": &self.user_id,
            "name": &self.name,
            "email": &self.email,
            "role": &self.role,
            "class": &self.classes,
        }
    }
}