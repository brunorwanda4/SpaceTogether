use mongodb::{Client, error::Result,Collection};
use crate::models::school_class;

pub async fn insert_class(client: &Client, class : school_class) -> Result<()> {
    let db: mongodb::Database = client.database("schoolDataBase");
    let collection: Collection<mongodb::bson::Document>= db.collection("classes");
    let class_document: mongodb::bson::Document = class.to_document();
    collection.insert_one(class_document,).await?;
    Ok(())
}