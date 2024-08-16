#![allow(unused)]
use serde::{Serialize , Deserialize};

use mongodb::bson::{doc , Document};

#[derive(Serialize , Deserialize , Debug)]
pub struct SchoolClass {
    pub name: String,
    pub category: String,
    pub username : String,
}

impl SchoolClass {
    pub fn to_document(&self) -> Document {
        doc! {
            "name" : &self.name,
            "category" : &self.category,
            "username" : &self.username,
        }
    }
}