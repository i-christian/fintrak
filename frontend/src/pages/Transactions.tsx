import {
  Component,
  createSignal,
  Suspense,
  Switch,
  Match,
  For,
  createResource,
  createEffect,
} from "solid-js";
import { getTotals, getTransactions } from "../hooks/useFetch";
import Summary from "../components/Summary";
import TransactionModal from "../components/TransactionModal";
import FilterModal from "../components/FilterModal";

export interface Transaction {
  trans_id: string;
  transaction_date: string;
  amount: number;
  notes: string;
  currency: string;
  category_name: string;
  transaction_type: "income" | "expense";
}
const Transactions: Component = () => {
  const [total, { refetch }] = createResource(getTotals);
  const [expanded, setExpanded] = createSignal(false);
  const [transactions, setTransactions] = createSignal<Transaction[]>([]);
  const [open, setOpen] = createSignal(false);
  const [filterOpen, setFilterOpen] = createSignal(false);
  const [typeOfData, setTypeOfData] = createSignal("Recent transactions");
  const [filteredData, setFilteredData] = createSignal<Transaction[]>([]);
  const [filterActive, setFilterActive] = createSignal(false);

  const toggleNotes = () => setExpanded(!expanded());

  const recentTransactions = async () => {
    const data: Transaction[] = await getTransactions();
    setTransactions(data);
    setTypeOfData("Recent transactions");
    setFilterActive(false);
  };

  const handleFilterToggle = () => {
    if (filterActive()) {
      setTypeOfData("Recent transactions");
      setFilterActive(false);
    } else {
      setFilterOpen(true);
    }
  };

  const handleFilterSuccess = (filteredData: Transaction[]) => {
    setFilteredData(filteredData);
    setTypeOfData("Filtered transactions");
    setFilterActive(true);
    setFilterOpen(false);
  };

  const handleModalSuccess = async () => {
    await recentTransactions();
    refetch();
    setOpen(false);
  };

  const formatCurrency = (currency: string, amount: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });
    return formatter.format(amount);
  };

  createEffect(() => {
    recentTransactions();
  });

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Match when={total.state === "errored"}>
            <span class="text-red-500 text-xl p-4 my-2">No available data</span>
          </Match>
          <Match when={total.state === "ready"}>
            <Summary total={total} />
          </Match>
        </Switch>
      </Suspense>

      <div class="flex gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
        <button class="btn" onClick={() => setOpen(true)}>
          New
        </button>
        <button class="btn" onClick={handleFilterToggle}>
          {filterActive() ? "Recent" : "Filter"}
        </button>
      </div>

      {open() && (
        <TransactionModal
          open={open}
          setOpen={setOpen}
          onSuccess={handleModalSuccess}
        />
      )}

      {filterOpen() && (
        <FilterModal
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          handleFilterSuccess={handleFilterSuccess}
        />
      )}

      <p class="mt-5 py-2 border-t-2 border-black text-center text-xl">
        {typeOfData()}
      </p>
      <section class="overflow-x-auto p-4">
        <table class="min-w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="px-4 py-2 border-b text-sm font-medium text-gray-700">
                Date
              </th>
              <th class="px-4 py-2 border-b text-sm font-medium text-gray-700">
                Amount
              </th>
              <th class="px-4 py-2 border-b text-sm font-medium text-gray-700">
                Category
              </th>
              <th class="px-4 py-2 border-b text-sm font-medium text-gray-700 hidden md:block">
                Type
              </th>
              <th class="px-4 py-2 border-b text-sm font-medium text-gray-700">
                Notes
              </th>
              <th class="px-4 py-2 border-b text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={filterActive() ? filteredData() : transactions()}>
              {(transaction) => (
                <tr
                  class={`hover:bg-gray-50 ${
                    transaction.transaction_type === "expense"
                      ? "bg-red-200"
                      : "bg-blue-200"
                  }`}
                >
                  <td class="px-4 py-2 text-sm text-gray-600">
                    {new Date(transaction.transaction_date).toLocaleString()}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-900 font-semibold">
                    {formatCurrency(transaction.currency, transaction.amount)}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {transaction.category_name}
                  </td>
                  <td class="px-4 py-2 text-sm hidden md:block text-gray-700">
                    {transaction.transaction_type}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-600">
                    <p
                      class={`${
                        expanded() ? "line-clamp-none" : "line-clamp-2"
                      } text-sm`}
                    >
                      {transaction.notes}
                    </p>
                    <button
                      class="text-blue-500 text-xs hover:underline"
                      onClick={toggleNotes}
                    >
                      {expanded() ? "Show Less" : "Show More"}
                    </button>
                  </td>
                  <td class="px-4 py-2 text-sm flex gap-1">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs">
                      Edit
                    </button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Transactions;
