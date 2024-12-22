use crate::AppState;
use axum::{
    http, middleware,
    routing::{get, post, put},
    Router,
};
use http::HeaderValue;
use http::Method;
use http::{
    header::{ACCEPT, AUTHORIZATION, ORIGIN},
    StatusCode,
};
use tower_http::cors::CorsLayer;

use crate::auth::{
    delete_user, edit_user, get_all_users, get_user, login, logout, register, validate_session,
};
use crate::categories::{create_category, delete_category, edit_category, get_categories};
use crate::insights::get_insights;
use crate::transactions::{
    create_transaction, delete_transaction, edit_transaction, get_transactions,
    get_transactions_by_date, get_transactions_totals,
};

/// Management of routing and authorisation for the whole application
///
/// ## Purpose:
/// - handles for CORS management
/// - handles allowed methods and headers for requests
/// - manages all routing for the application
pub fn create_api_router(state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_credentials(true)
        .allow_methods(vec![Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(vec![ORIGIN, AUTHORIZATION, ACCEPT])
        .allow_origin(state.domain.parse::<HeaderValue>().unwrap());

    let categories = Router::new()
        .route("/", get(get_categories))
        .route("/", post(create_category))
        .route("/:id", put(edit_category).delete(delete_category));

    let transactions = Router::new()
        .route("/", get(get_transactions).post(create_transaction))
        .route("/by_date", get(get_transactions_by_date))
        .route("/totals", get(get_transactions_totals))
        .route("/:id", put(edit_transaction).delete(delete_transaction));

    let insights = Router::new().route("/", get(get_insights));

    let auth_router = Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/logout", get(logout))
        .route("/user", get(get_user).put(edit_user).delete(delete_user))
        .route("/get_all_users", get(get_all_users));

    Router::new()
        // nest protected routes here
        .nest("/transactions", transactions)
        .nest("/categories", categories)
        .nest("/insights", insights)
        .route("/check", get(auth_check))
        .layer(middleware::from_fn_with_state(
            state.clone(),
            validate_session,
        ))
        .nest("/auth", auth_router)
        .route("/health", get(hello_world))
        .with_state(state)
        .layer(cors)
}

/// Handles checking user authentication.
///
/// # GET /check
///
/// ## Purpose
/// - Checks if the user has a valid session or not.
pub async fn auth_check() -> StatusCode {
    StatusCode::OK
}

/// Checks if the API is online
///
/// # GET /health
pub async fn hello_world() -> &'static str {
    "Hello world!"
}
