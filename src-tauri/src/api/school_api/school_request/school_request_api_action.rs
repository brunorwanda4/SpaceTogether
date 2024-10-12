use reqwest::Client;
use serde_json::Value;
use crate::{errors::result::ResReq, libs::api_conn::api_conn_st, models::school::school_request_model::SchoolRequestModel};

#[tauri::command]
pub async fn create_new_school_request(request: SchoolRequestModel) -> ResReq {
    let url = api_conn_st().await;

    let http_client = Client::new();
    let create_req = http_client
        .post(format!("{}/schoolRequest", url))
        .json(&request)
        .send()
        .await;

    // Handle the result of the POST request.
    match create_req {
        Ok(res) => {
            if res.status().is_success() {
                // Try to parse the JSON response.
                let json: Value = match res.json().await {
                    Ok(j) => j,
                    Err(err) => {
                        return ResReq {
                            success: false,
                            message: format!("Failed to parse JSON response: {}", err),
                        };
                    }
                };

                // Check for the "insertedId" in the JSON response.
                if let Some(inserted_id) = json.get("insertedId")
                        .and_then(|id| id.get("$oid"))
                        .and_then(|oid| oid.as_str()) {
                    return ResReq {
                        success: true,
                        message: format!("Successfully created school request with ID: {}", inserted_id),
                    };
                }

                // If "success" is false, extract the message and return it.
                if let Some(success) = json.get("success").and_then(|s| s.as_bool()) {
                    if !success {
                        if let Some(message) = json.get("message").and_then(|m| m.as_str()) {
                            return ResReq {
                                success: false,
                                message: message.to_string(),
                            };
                        }
                    }
                }

                // Handle unexpected JSON structure.
                ResReq {
                    success: false,
                    message: "Unexpected response structure from the server.".to_string(),
                }
            } else {
                // Handle non-success HTTP status codes.
                ResReq {
                    success: false,
                    message: format!("Request failed with status: {}", res.status()),
                }
            }
        }
        // Handle network or request errors.
        Err(err) => ResReq {
            success: false,
            message: format!("Error creating new school request: {}", err),
        },
    }
}
