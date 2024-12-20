// Once categories are in place, users need to log and view their transactions.
// Enforce referential integrity with type_id and category_id using queries that validate these foreign keys.
// Use filters (e.g., query params) to narrow down results by date range, category, or transaction type.

// POST /transactions
// Create a new transaction (validate that category_id and type_id are valid for the user).

// PUT /transactions/{id}
// Update an existing transaction.

// DELETE /transactions/{id}
// Delete a transaction.

// GET /transactions

// List all transactions for the authenticated user.
// Optional Filters:
// Category: Filter by category name (e.g., ?category=Groceries).
// Type: Filter by transaction type (e.g., ?type=expense or ?type=income).
// Key Considerations:

// Validate that the category filter corresponds to a category the user owns.
// Validate type against predefined transaction types (expense, income).
// Ensure proper indexing on user_id, category_id, type_id, and transaction_date for efficient querying.

// GET /transactions/{year}/{month}

// Fetch all transactions for a specific month and year.
// Purpose:
// Simplifies frontend access to monthly transactions without requiring date-range filtering logic on the client.
// Results are automatically filtered by user_id and sorted by transaction_date.
// Key Considerations:

// Ensure year and month are valid inputs.
// Handle edge cases like empty months (return an empty list).
