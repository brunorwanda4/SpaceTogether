use serde::{Deserialize, Serialize};

#[derive(Debug , Deserialize , Serialize , Clone)]
pub struct CountryModelLocation {
    pub country : String,
    pub province : String,
    pub district : String,
}

#[derive(Debug , Clone ,Deserialize , Serialize)]
pub struct SchoolRequestModel {
    pub sended_by: String,
    pub name: String,
    pub username: String,
    pub email: String,
    pub phone: String,
    pub location: CountryModelLocation,
    pub description: String,
}
