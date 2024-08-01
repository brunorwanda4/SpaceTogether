use serde::{Serialize, Deserialize};
use mongodb::bson::doc;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub name: String,
    pub email: String,
    pub age: i32,
}

impl User {
    pub fn to_document(&self) -> mongodb::bson::Document {
        doc! {
            "name": &self.name,
            "email": &self.email,
            "age": &self.age,
        }
    }
}