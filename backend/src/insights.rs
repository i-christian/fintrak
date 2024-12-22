use axum::{extract::State, response::IntoResponse, Json};
use axum_extra::extract::PrivateCookieJar;
use bigdecimal::BigDecimal;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use crate::{auth::get_user_id, AppState};

#[derive(Serialize, Deserialize, FromRow)]
struct InsightsResponse {
    pub transaction_type: String,
    #[serde(with = "time::serde::iso8601")]
    pub month: time::OffsetDateTime,
    #[serde(with = "bigdecimal::serde::json_num")]
    pub total: BigDecimal,
}

/// Handles dashboard/graph data retrieval
/// # GET /insights
/// # Purpose:
/// - return a summary of transactions for the last 6 months
pub async fn get_insights(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
) -> impl IntoResponse {
    let Some(user_id) = get_user_id(jar, State(state.clone())).await else {
        return (StatusCode::FORBIDDEN, "Unauthorized").into_response();
    };

    let query = sqlx::query_as::<_, InsightsResponse>(
        "
        SELECT 
            ttype.name AS transaction_type,
            lm.month,
            lm.total
        FROM 
            last_6_months_transactions lm
        JOIN 
            transaction_types ttype
        ON 
            lm.type_id = ttype.id
        WHERE 
            lm.user_id = $1
        ORDER BY 
            lm.month, ttype.name;
        ",
    )
    .bind(user_id)
    .fetch_all(&state.postgres)
    .await;

    match query {
        Ok(insights) => Json(insights).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to retrieve insights: {}", e),
        )
            .into_response(),
    }
}
