use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};

use super::image_model::ProfileImageType;
// use chrono::{Utc};

#[derive(Serialize, Deserialize, Debug)]
pub enum TGender {
    Male,
    Female,
    Other,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserModel {
    #[serde(rename = "_id")]
    pub id: Option<ObjectIdWrapper>,  // Wrapper to handle MongoDB ObjectId
    pub name: String,
    pub email: String,
    pub password: Option<String>,
    pub gender: Option<TGender>,
    pub image: Option<ProfileImageType>,
    pub birth_date: Option<String>,
    pub facebook: Option<String>,
    pub twitter: Option<String>,
    pub instagram: Option<String>,
    pub linkedin: Option<String>,
    pub snapchat: Option<String>,
    pub whatsapp: Option<String>,
    pub username: Option<String>,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

// Wrapper for ObjectId to match the JSON structure
#[derive(Debug, Serialize, Deserialize)]
pub struct ObjectIdWrapper {
    #[serde(rename = "$oid")]
    pub oid: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserModel {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub gender: Option<String>,
    pub image: Option<String>,
    pub birth_date: Option<String>,
    pub facebook: Option<String>,
    pub twitter: Option<String>,
    pub instagram: Option<String>,
    pub linkedin: Option<String>,
    pub snapchat: Option<String>,
    pub whatsapp: Option<String>,
    pub username: Option<String>,
    pub phone_number: Option<String>,
}