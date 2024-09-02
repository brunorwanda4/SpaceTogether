use std::env;
use dotenv::dotenv;

pub async fn api_conn_st() -> String {
    dotenv().ok();

    let api = env::var("ST_API").expect("no API variable ❤️ : 'ST_API'");
    
   return api.to_string();

}