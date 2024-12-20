use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};
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

#[derive(Serialize, Deserialize)]
pub struct CategoryRequest {
    pub name: String,
    pub transaction_type: String,
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
//creates a new category
pub async fn create_category(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
    Json(request): Json<CategoryRequest>,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let type_id: Option<String> =
        sqlx::query_scalar("SELECT id FROM transaction_types WHERE name = $1")
            .bind(request.transaction_type)
            .fetch_optional(&state.postgres)
            .await
            .expect("Failed to find transaction type");

    let query = sqlx::query("INSERT INTO categories (user_id, name, type_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",).bind(user_id).bind(request.name).bind(type_id).execute(&state.postgres);

    match query.await {
        Ok(_) => (StatusCode::OK, "Category created successfully").into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to create category: {}", e),
        )
            .into_response(),
    }
}

// PUT /categories/{id}
// we can change the category name, and type_id (transaction type)
//return success or failure status
pub async fn edit_category(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(update): Json<CategoryRequest>,
) -> impl IntoResponse {
    let type_id: Option<String> =
        sqlx::query_scalar("SELECT id FROM transaction_types WHERE name = $1")
            .bind(update.transaction_type)
            .fetch_optional(&state.postgres)
            .await
            .expect("Failed to find transaction type");

    let query = sqlx::query("UPDATE categories SET name = COALESCE($1, name), type_id = COALESCE($2, type_id) WHERE id = $3").bind(&update.name).bind(type_id).bind(id).execute(&state.postgres);

    match query.await {
        Ok(result) if result.rows_affected() > 0 => {
            (StatusCode::OK, "Category update successfully").into_response()
        }
        Ok(_) => (StatusCode::NOT_FOUND, "Category not found!").into_response(),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Failed to update category",
        )
            .into_response(),
    }
}

// DELETE /categories/{id}
// we can delete the category for the user
// return success or failure status
