import {
  Accessor,
  Component,
  createSignal,
  Setter,
  onMount,
  For,
} from "solid-js";
import { editTransaction, getCategories } from "../hooks/useFetch";
import { Transaction } from "../pages/Transactions";

interface Category {
  category_id: string;
  category_name: string;
  transaction_type: "income" | "expense";
}

interface EditModalProps {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  transaction: Accessor<Transaction | null>;
  onSuccess: () => void;
}

const EditModal: Component<EditModalProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = createSignal<string | null>(
    null,
  );
  const [categories, setCategories] = createSignal<Category[]>([]);
  const [amount, setAmount] = createSignal<number>(0);
  const [notes, setNotes] = createSignal<string | null>(null);
  const [transactionType, setTransactionType] = createSignal<
    "income" | "expense"
  >("income");
  const [error, setError] = createSignal("");

  const listCategories = async () => {
    setError("");
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      setError("Categories not found.");
    }
  };

  onMount(() => {
    listCategories();
    const transaction = props.transaction();
    if (transaction) {
      setSelectedCategory(transaction.category_name);
      setAmount(transaction.amount);
      setNotes(transaction.notes);
      setTransactionType(transaction.transaction_type);
    }
  });

  const handleUpdateTransaction = async () => {
    setError("");
    try {
      if (!selectedCategory()) setError("Please select a category.");
      if (amount() <= 0) setError("Amount must be greater than zero.");
      await editTransaction(
        props.transaction()!.trans_id,
        selectedCategory()!,
        transactionType(),
        amount(),
        notes(),
      );
      props.onSuccess();
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Edit Transaction</h2>
        {error() && (
          <div class="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error()}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateTransaction();
          }}
        >
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="category">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory() || ""}
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
            <label class="block text-sm font-medium mb-2" for="transactionType">
              Transaction Type
            </label>
            <div id="transactionType" class="flex gap-4">
              <label class="flex items-center gap-2">
                <input
                  type="radio"
                  name="transactionType"
                  value="income"
                  checked={transactionType() === "income"}
                  onChange={() => setTransactionType("income")}
                />
                Income
              </label>
              <label class="flex items-center gap-2">
                <input
                  type="radio"
                  name="transactionType"
                  value="expense"
                  checked={transactionType() === "expense"}
                  onChange={() => setTransactionType("expense")}
                />
                Expense
              </label>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" for="amount">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount() || ""}
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
              value={notes() || ""}
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
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
