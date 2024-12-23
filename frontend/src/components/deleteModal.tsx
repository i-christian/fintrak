import { Accessor, Component, createSignal, Setter } from "solid-js";
import { Transaction } from "../pages/Transactions";
import { deleteTransaction } from "../hooks/useFetch";

interface DeleteModalProps {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  transaction: Accessor<Transaction | null>;
  onSuccess: () => void;
}

const DeleteModal: Component<DeleteModalProps> = (props) => {
  const [error, setError] = createSignal("");

  const handleDeleteTransaction = async () => {
    setError("");
    try {
      await deleteTransaction(props.transaction()!.trans_id);
      props.onSuccess();
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-5 rounded shadow-lg max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4">Delete Transaction</h2>
        {error() && (
          <div class="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error()}
          </div>
        )}
        <p>Are you sure you want to delete this transaction?</p>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            class="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteTransaction}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
