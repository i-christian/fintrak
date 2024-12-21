use crate::AppState;
use axum::{
    http, middleware,
    routing::{delete, get, post, put},
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
use crate::transactions::{
    create_transaction, delete_transaction, get_transactions, get_transactions_by_date,
    get_transactions_totals,
};

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
        .route("/:id", delete(delete_transaction));

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

pub async fn auth_check() -> StatusCode {
    StatusCode::OK
}

pub async fn hello_world() -> &'static str {
    "Hello world!"
}
