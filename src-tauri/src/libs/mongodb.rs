// src/mongodb.rs
use mongodb::{Client, options::ClientOptions, error::Result, Collection};
use crate::models::User;

pub async fn connect_to_mongodb() -> Result<Client> {
    let client_uri: &str = "mongodb://localhost:27017";
    let mut client_options: ClientOptions = ClientOptions::parse(client_uri).await?;
    client_options.app_name = Some("TauriApp".to_string());
    let client = Client::with_options(client_options)?;
    Ok(client)
}

pub async fn insert_user(client: &Client, user: User) -> Result<()> {
    let db: mongodb::Database = client.database("schoolDataBase");
    let collection: Collection<mongodb::bson::Document> = db.collection("users");
    let user_document = user.to_document();
    collection.insert_one(user_document,).await?;
    Ok(())
}
