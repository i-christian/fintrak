use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};
use axum_extra::extract::{PrivateCookieJar, Query};
use bigdecimal::BigDecimal;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use sqlx::{
    prelude::FromRow,
    types::chrono::{self, NaiveDate},
};
use uuid::Uuid;

use crate::{auth::get_user_id, AppState};

#[derive(Serialize, Deserialize)]
pub struct TransactionRequest {
    pub category_name: String,
    #[serde(with = "bigdecimal::serde::json_num")]
    pub amount: BigDecimal,
    pub notes: String,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct TransactionInfo {
    pub trans_id: Uuid,
    #[serde(with = "time::serde::iso8601")]
    pub transaction_date: time::OffsetDateTime,
    #[serde(with = "bigdecimal::serde::json_num")]
    pub amount: BigDecimal,
    pub notes: String,
    pub currency: String,
    pub category_name: String,
    pub transaction_type: String,
}

#[derive(Deserialize)]
pub struct Params {
    #[serde(default)]
    pub year: Option<i32>,
    pub month: Option<u32>,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct TransactionTotals {
    pub category_name: String,
    pub transaction_type: String,
    #[serde(with = "bigdecimal::serde::json_num")]
    pub total_amount: BigDecimal,
}

/// Handles creating a new transaction.
///
/// # POST /transactions
///
/// ## Purpose
/// Create a new transaction for the authenticated user.
pub async fn create_transaction(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
    Json(request): Json<TransactionRequest>,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let result: (Uuid, i32) = sqlx::query_as("SELECT id, type_id FROM categories WHERE name = $1")
        .bind(request.category_name)
        .fetch_one(&state.postgres)
        .await
        .expect("Failed to find category");

    let query = sqlx::query("INSERT INTO transactions (user_id, category_id, type_id, amount, notes) VALUES ($1, $2, $3, $4, $5)").bind(user_id).bind(result.0).bind(result.1).bind(request.amount).bind(request.notes).execute(&state.postgres);

    match query.await {
        Ok(_) => (StatusCode::OK, "Transaction created successfully").into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to add transaction: {}", e),
        )
            .into_response(),
    }
}

/// Handles default transactions retrieval.
///
/// # GET /transactions
///
/// ## Purpose
/// returns a lists all transactions for the authenticated user.
pub async fn get_transactions(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let query = sqlx::query_as::<_, TransactionInfo>(
        "
        SELECT
            transactions.id AS trans_id,
            transactions.transaction_date,
            transactions.amount,
            transactions.notes,
            transactions.currency,
            categories.name AS category_name,
            transaction_types.name AS transaction_type
        FROM
            transactions
        JOIN
            categories ON transactions.category_id = categories.id
        JOIN
            transaction_types ON transactions.type_id = transaction_types.id
        WHERE
            transactions.transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
        AND 
            transactions.transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
        AND
            transactions.user_id = $1
        ORDER BY
            transactions.transaction_date DESC;
        ",
    )
    .bind(user_id)
    .fetch_all(&state.postgres)
    .await;

    match query {
        Ok(categories) => Json(categories).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to retrieve transactions: {}", e),
        )
            .into_response(),
    }
}

/// Handles specified transactions retrieval.
///
/// # GET /transactions/{year}/{month}
///
/// Purpose: Fetch transactions for a specific past month and year.

pub async fn get_transactions_by_date(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let year = params.year.unwrap_or_default();
    let month = params.month.unwrap_or_default();

    let full_date = NaiveDate::from_ymd_opt(year, month, 1)
        .unwrap_or_else(|| chrono::Local::now().date_naive());

    let query = sqlx::query_as::<_, TransactionInfo>(
        "
        SELECT
            transactions.id AS trans_id,
            transactions.transaction_date,
            transactions.amount,
            transactions.notes,
            transactions.currency,
            categories.name AS category_name,
            transaction_types.name AS transaction_type
        FROM
            transactions
        JOIN
            categories ON transactions.category_id = categories.id
        JOIN
            transaction_types ON transactions.type_id = transaction_types.id
        WHERE
            transactions.transaction_date >= DATE_TRUNC('month', $1)
        AND
            transactions.transaction_date < DATE_TRUNC('month', $1) + INTERVAL '1 month'
        AND
            transactions.user_id = $2
        ORDER BY
            transactions.transaction_date DESC;
        ",
    )
    .bind(full_date)
    .bind(user_id)
    .fetch_all(&state.postgres)
    .await;

    match query {
        Ok(categories) => Json(categories).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to retrieve transactions: {}", e),
        )
            .into_response(),
    }
}

/// Handles default transactions retrieval.
///
/// # GET /transactions/totals
///
/// ## Purpose
/// Retrieve total transaction amounts for each category for the authenticated user
pub async fn get_transactions_totals(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let query = sqlx::query_as::<_, TransactionTotals>(
        "
        SELECT
            categories.name AS category_name,
            transaction_types.name AS transaction_type,
            SUM(transactions.amount) AS total_amount
        FROM
            transactions
        JOIN
            categories ON transactions.category_id = categories.id
        JOIN
            transaction_types ON transactions.type_id = transaction_types.id
        WHERE
            transactions.transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
        AND
            transactions.transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
        AND
            transactions.user_id = $1
        GROUP BY
            categories.name, transaction_types.name
        ORDER BY
            SUM(transactions.amount) DESC;
        ",
    )
    .bind(user_id)
    .fetch_all(&state.postgres)
    .await;

    match query {
        Ok(categories) => Json(categories).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to retrieve transactions totals: {}", e),
        )
            .into_response(),
    }
}

// // PUT /transactions/{id}
// // Purpose: Update an existing transaction.
// // Validations:
// // Ensure the transaction belongs to the authenticated user.
// // Validate category_id and type_id if updated.
// // Behavior:
// // Update the transaction record with the new values.

/// # DELETE /transactions/{id}
/// Purpose: Delete a specific transaction.
///Behavior:
/// Remove the transaction from the database.
pub async fn delete_transaction(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> impl IntoResponse {
    let query = sqlx::query("DELETE FROM categories WHERE id = $1")
        .bind(id)
        .execute(&state.postgres);

    match query.await {
        Ok(result) if result.rows_affected() > 0 => {
            (StatusCode::OK, "Transaction deleted successfully").into_response()
        }
        Ok(_) => (StatusCode::NOT_FOUND, "Transaction not founf!").into_response(),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Failed to delete transaction",
        )
            .into_response(),
    }
}
