import { Component, createSignal } from "solid-js";

const Summary: Component = () => {
  const [income, setIncome] = createSignal<number>(0);
  const [expense, setExpense] = createSignal<number>(0);

  const fetchData = async () => {
    const response = await fetch(
      `//${window.location.host}/api/transactions/totals`,
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      },
    );

    if (!response.ok)
      throw new Error("failed to fetch total income and expenses");

    let data = await response.json();

    const incomeData = data.find(
      (item: { transaction_type: string; total_amount: number }) =>
        item.transaction_type === "income",
    );
    const expenseData = data.find(
      (item: { transaction_type: string; total_amount: number }) =>
        item.transaction_type === "expense",
    );

    setIncome(incomeData ? incomeData.total_amount : 0);
    setExpense(expenseData ? expenseData.total_amount : 0);
  };

  fetchData();

  return (
    <section class="p-2 border bg-slate-300 rounded-md">
      <header class="text-center font-bold text-2xl">Monthly Summary</header>
      <div class="mt-5 ml-5 text-md">
        <p class="text-md font-bold text-blue-900">Income: {income()}</p>
        <p class="text-md font-bold text-red-900">Expense: {expense()}</p>
      </div>
    </section>
  );
};

export default Summary;
