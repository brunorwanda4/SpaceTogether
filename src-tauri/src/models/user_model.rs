use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};

#[derive(Deserialize , Serialize , Debug)]
pub struct UserModel {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id  : Option<ObjectId>,
    pub name : String,
    pub email : String,
    pub password : Option<String>,
    pub gender : Option<String>,
    pub image : Option<String>,
    pub birth_date : Option<DateTime>,
}