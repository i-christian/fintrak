import { Accessor, Component, createSignal, Setter } from "solid-js";
import { getTransactionsByDate } from "../hooks/useFetch";
import { Transaction } from "../pages/Transactions";

interface FilterModalProps {
  filterOpen: Accessor<boolean>;
  setFilterOpen: Setter<boolean>;
  setFilteredData: Setter<Transaction[]>;
}

const FilterModal: Component<FilterModalProps> = (props) => {
  const [year, setYear] = createSignal("");
  const [month, setMonth] = createSignal("");
  const [error, setError] = createSignal("");

  const handleFilterTransaction = async () => {
    setError("");
    try {
      if (!year()) throw new Error("Please select a year");
      if (!month()) throw new Error("Please select a month");
      const data = await getTransactionsByDate(year(), month());
      props.setFilteredData(data);
      props.setFilterOpen(false);
    } catch (err) {
      setError(`No data found: ${error}`);
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Filter Transactions</h2>
        {error() && (
          <div class="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error()}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFilterTransaction();
          }}
        >
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="year">
              Year
            </label>
            <select
              id="year"
              value={year()}
              onInput={(e) => setYear(e.currentTarget.value)}
              class="w-full p-2 border rounded"
            >
              <option value="">Select Year</option>
              <option value={(new Date().getFullYear() - 1).toString()}>
                {new Date().getFullYear() - 1} (Last year)
              </option>
              <option value={new Date().getFullYear().toString()}>
                {new Date().getFullYear()} (Current year)
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="month">
              Month
            </label>
            <select
              id="month"
              value={month()}
              onInput={(e) => setMonth(e.currentTarget.value)}
              class="w-full p-2 border rounded"
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option value={(i + 1).toString()}>{(i + 1).toString()}</option>
              ))}
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => props.setFilterOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
