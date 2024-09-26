use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};


#[derive(Debug , Clone ,Serialize , Deserialize)]
pub struct ProfileImageModel {
    pub src : String,
    pub created_at: Option<DateTime>,
}



#[derive(Debug, Serialize, Deserialize , Clone)]
#[serde(untagged)]
pub enum ProfileImageType {
    ObjectId(ObjectId),
    String(String),
    Images(Vec<ProfileImageModel>)
}