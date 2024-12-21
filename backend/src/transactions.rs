use axum::{extract::State, response::IntoResponse, Json};
use axum_extra::extract::PrivateCookieJar;
use bigdecimal::BigDecimal;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{auth::get_user_id, AppState};

#[derive(Serialize, Deserialize)]
pub struct TransactionRequest {
    pub category_name: String,
    #[serde(with = "bigdecimal::serde::json_num")]
    pub amount: BigDecimal,
    pub notes: String,
}

// // POST /transactions
// // Purpose: Create a new transaction.
// // Validations:
// // Ensure category_id and type_id exist and belong to the authenticated user.
// // Behavior:
// // Add the transaction to the database with the appropriate user_id, category_id, type_id, amount, transaction_date, and optional notes.
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

    let query = sqlx::query("INSERT INTO transactions (user_id, category_id, amount, type_id, notes) VALUES ($1, $2, $3, $4, $5)").bind(user_id).bind(result.0).bind(result.1).bind(request.amount).bind(request.notes).execute(&state.postgres);

    match query.await {
        Ok(_) => (StatusCode::OK, "Transaction created successfully").into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to add transaction: {}", e),
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

// // DELETE /transactions/{id}
// // Purpose: Delete a specific transaction.
// // Validations:
// // Ensure the transaction belongs to the authenticated user.
// // Behavior:
// // Remove the transaction from the database.

// // GET /transactions
// // Purpose: Retrieve transactions for the current month.
// // Behavior:
// // Return transactions for the authenticated user, grouped by category_id and type_id, and ordered by transaction_date (latest on top).
// // Key Features:
// // Transactions are automatically filtered to only include those from the current month.
// // Results are grouped for easy categorization and analysis.

// // GET /transactions/{year}/{month}
// // Purpose: Fetch transactions for a specific past month and year.
// // Behavior:
// // Retrieve transactions for the given year and month for the authenticated user.
// // Results are grouped by category_id and type_id, and ordered by transaction_date (latest on top).
// // Validations:
// // Ensure valid year and month inputs.
// // Edge Case Handling:
// // Return an empty list if there are no transactions for the specified period.

// // GET /transactions/totals
// // Purpose: Retrieve total transaction amounts for each category for the authenticated user.
// // Behavior:
// // Aggregate transactions by category_id for that month.
// // Include totals grouped by type_id for each category.
