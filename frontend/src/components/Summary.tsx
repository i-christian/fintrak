import { Accessor, Component } from "solid-js";

const Summary: Component<{ total: Accessor<any> }> = (props) => {
  const income: number | string =
    props.total()?.find((item: any) => item.transaction_type === "income")
      ?.total_amount || "N/A";
  const expense: number | string =
    props.total()?.find((item: any) => item.transaction_type === "expense")
      ?.total_amount || "N/A";

  return (
    <section class="p-2 border bg-slate-300 rounded-md">
      <header class="text-center font-bold text-2xl">Monthly Summary</header>
      <div class="mt-5 ml-5 text-md">
        <p class="text-md font-bold text-blue-900">Income: {income}</p>
        <p class="text-md font-bold text-red-900">Expense: {expense}</p>
      </div>
    </section>
  );
};

export default Summary;
