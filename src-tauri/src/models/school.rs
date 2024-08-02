use serde::{Serialize , Deserialize};

use mongodb::bson::{doc , Document};

#[derive(Serialize , Deserialize , Debug)]
pub struct school_class {
    pub name: String,
    pub category: String,
    pub username : String,
}

impl school_class {
    pub fn to_document(&self) -> Document {
        doc! {
            "name" : &self.name,
            "category" : &self.category,
            "username" : &self.username,
        }
    }
}