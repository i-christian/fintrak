import {
  Accessor,
  Component,
  createSignal,
  Setter,
  For,
  onMount,
} from "solid-js";
import { createTransaction, getCategories } from "../hooks/useFetch";

interface TransactionModalProps {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  onSuccess: () => void;
}

interface Category {
  category_id: string;
  category_name: string;
  transaction_type: "income" | "expense";
}

const TransactionModal: Component<TransactionModalProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = createSignal("");
  const [categories, setCategories] = createSignal<Category[]>([]);
  const [amount, setAmount] = createSignal(0);
  const [notes, setNotes] = createSignal("");
  const [error, setError] = createSignal("");

  const listCategories = async () => {
    setError("");
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setError("categories not found");
    }
  };
  onMount(() => listCategories());

  const handleCreateTransaction = async () => {
    setError("");
    try {
      if (!selectedCategory()) throw new Error("Please select a category.");
      if (amount() <= 0) throw new Error("Amount must be greater than zero.");
      await createTransaction(selectedCategory(), amount(), notes());
      props.onSuccess();
    } catch (error) {
      setError(`An unexpected error occurred`);
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Add New Transaction</h2>
        {error() && (
          <div class="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error()}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateTransaction();
          }}
        >
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="category">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory()}
              onInput={(e) => setSelectedCategory(e.currentTarget.value)}
              class="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              <For each={categories()}>
                {(cat: Category) => (
                  <option value={cat.category_name}>
                    {cat.category_name} ({cat.transaction_type})
                  </option>
                )}
              </For>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="amount">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Amount"
              value={amount()}
              onInput={(e) => setAmount(Number(e.currentTarget.value))}
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="notes">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Notes"
              value={notes()}
              onInput={(e) => setNotes(e.currentTarget.value)}
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => props.setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
