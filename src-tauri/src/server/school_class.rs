use mongodb::{Client, options::ClientOptions, error::Result, Collection};
use mongodb::bson::{doc, oid::ObjectId, Document, DateTime};

use crate::models::school_class;

pub async fn insert_class(client: &Client, class : school_class) -> Result<()> {
    let db: mongodb::Database = client.database("schoolDataBase");
    let collection: Collection<mongodb::bson::Document>= db.collection("classes");
    let class_document: mongodb::bson::Document = class.to_document();
    collection.insert_one(class_document,).await?;
    Ok(())
}


// get all class 
// pub async fn get_all_classes(client: &Client) -> Result<Vec<school_class>> {
//     let db: mongodb::Database = client.database("schoolDataBase");
//     let collection: Collection<Document> = db.collection("classes");
//     let cursor: mongodb::Cursor<Document> = collection.find(None,).await?;
//     let mut classes: Vec<school_class> = Vec::new();
//     for result in cursor {
//         let doc: <<mongodb::Cursor<Document> as IntoIterator>::Item as Try>::Output = result?;
//         let class: school_class = bson::from_bson(bson::Bson::Document(doc))?;
//         classes.push(class);
//     }
//     Ok(classes)
// }