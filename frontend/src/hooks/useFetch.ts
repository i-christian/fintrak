export const getUser = async () => {
  const response = await fetch(`//${window.location.host}/api/auth/user`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  if (!response.ok) throw new Error("failed to load user information");

  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`//${window.location.host}/api/categories`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  if (!response.ok) throw new Error("failed to load user information");

  return response.json();
};

export const createCategory = async (name: string, type: string) => {
  const response = await fetch(`//${window.location.host}/api/categories`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      transaction_type: type,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return "Category created successfully";
};

export const updateCategory = async (
  id: string,
  name: string | null,
  type: string | null,
) => {
  const response = await fetch(
    `//${window.location.host}/api/categories/${id}`,
    {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        transaction_type: type,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return "Category updated successfully";
};

export const deleteCategory = async (id: String) => {
  const response = await fetch(
    `//${window.location.host}/api/categories/${id}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return "Category updated successfully";
};

export const createTransaction = async (
  category: string,
  amount: number,
  notes: string | null,
) => {
  const response = await fetch(`//${window.location.host}/api/transactions`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_name: category,
      amount: amount,
      notes: notes,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }
};

export const editTransaction = async (
  id: string,
  category: string | null,
  type: string | null,
  amount: number | null,
  notes: string | null,
) => {
  const response = await fetch(
    `//${window.location.host}/api/transactions/${id}`,
    {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: category,
        transaction_type: type,
        amount: amount,
        notes: notes,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }

  return "Transaction updated successfully";
};

export const deleteTransaction = async (id: string) => {
  const response = await fetch(
    `//${window.location.host}/api/transactions/${id}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }

  return "Transaction deleted successfully";
};

export const getTotals = async () => {
  const response = await fetch(
    `//${window.location.host}/api/transactions/totals`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    },
  );

  if (!response.ok) throw new Error("failed to load user information");

  return response.json();
};

export const getTransactions = async () => {
  const response = await fetch(`//${window.location.host}/api/transactions`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  if (!response.ok) throw new Error("failed to load user information");

  return response.json();
};

export const getTransactionsByDate = async (year: string, month: string) => {
  const params = new URLSearchParams({
    year: year,
    month: month,
  });
  const url = new URL(`//${window.location.host}/api/transactions/${params}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Failed to load transactions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
