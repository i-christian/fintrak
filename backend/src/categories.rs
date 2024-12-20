use axum::{extract::State, response::IntoResponse, Json};
use axum_extra::extract::PrivateCookieJar;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;
use uuid::Uuid;

use crate::{auth::get_user_id, AppState};

#[derive(Serialize, Deserialize, FromRow)]
pub struct CategoryInfo {
    pub id: Uuid,
    pub name: String,
}

// GET /categories
// list all categories for the authenticated user
pub async fn get_categories(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let query =
        sqlx::query_as::<_, CategoryInfo>("SELECT id, name FROM categories WHERE user_id = $1")
            .bind(user_id)
            .fetch_all(&state.postgres)
            .await;

    match query {
        Ok(categories) => Json(categories).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to retrieve categories: {}", e),
        )
            .into_response(),
    }
}

// POST /categories
//create a new category
// -check for type_id validity by first retrieving the id using name (income or expense). Use that id ans type_id when creating a category by binding it to insert statement
// - return success or failure status
// - on success also return the new category id

// PUT /categories/{id}
// we can change the category name, and type_id (transaction type)
//return success or failure status

// DELETE /categories/{id}
// we can delete the category for the user
// return success or failure status
