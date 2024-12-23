import { Accessor, Component, createSignal, Setter } from "solid-js";
import { createTransaction } from "../hooks/useFetch";

interface TransactionModalProps {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  onSuccess: () => void;
}

const TransactionModal: Component<TransactionModalProps> = (props) => {
  const [category, setCategory] = createSignal("");
  const [amount, setAmount] = createSignal(0);
  const [notes, setNotes] = createSignal("");
  const [error, setError] = createSignal("");

  const handleCreateTransaction = async () => {
    setError("");
    try {
      await createTransaction(category(), amount(), notes());
      props.onSuccess();
    } catch (error) {
      setError(`An unexpected error occurred.`);
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
          <input
            type="text"
            placeholder="Category"
            value={category()}
            onInput={(e) => setCategory(e.currentTarget.value)}
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount()}
            onInput={(e) => setAmount(Number(e.currentTarget.value))}
            class="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={notes()}
            onInput={(e) => setNotes(e.currentTarget.value)}
            class="w-full mb-4 p-2 border rounded"
          />
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
