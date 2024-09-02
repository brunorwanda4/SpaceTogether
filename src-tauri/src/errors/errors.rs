use serde::Serialize;

pub type Result<T> = core::result::Result<T , MyError>;

#[derive(Debug , Serialize)]
pub enum MyError {
    // user error
    CanNotGetUserById,
}