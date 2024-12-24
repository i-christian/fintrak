import { Component, createSignal, For, createEffect } from "solid-js";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../hooks/useFetch";

interface Category {
  category_id: string;
  category_name: string;
  transaction_type: "income" | "expense";
}

const Categories: Component = () => {
  const [categories, setCategories] = createSignal<Category[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [open, setOpen] = createSignal(false);
  const [editOpen, setEditOpen] = createSignal(false);
  const [deleteOpen, setDeleteOpen] = createSignal(false);
  const [selectedCategory, setSelectedCategory] = createSignal<Category | null>(
    null,
  );
  const [formData, setFormData] = createSignal({
    name: "",
    type: "income",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    fetchCategories();
  });

  const handleAddCategory = async () => {
    try {
      await createCategory(formData().name, formData().type);
      fetchCategories();
      setOpen(false);
      setFormData({ name: "", type: "income" });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEditCategory = async () => {
    if (selectedCategory()) {
      try {
        await updateCategory(
          selectedCategory()!.category_id,
          formData().name,
          formData().type,
        );
        fetchCategories();
        setEditOpen(false);
        setSelectedCategory(null);
        setFormData({ name: "", type: "income" });
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory()) {
      try {
        await deleteCategory(selectedCategory()!.category_id);
        fetchCategories();
        setDeleteOpen(false);
        setSelectedCategory(null);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char: any) => char.toUpperCase());
  };

  return (
    <main class="p-4">
      <header class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-semibold text-gray-700">Manage Categories</h1>
        <button
          class="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => setOpen(true)}
        >
          + New Category
        </button>
      </header>

      <section class="overflow-x-auto">
        {loading() ? (
          <p>Loading categories...</p>
        ) : categories().length > 0 ? (
          <table class="min-w-full table-auto border-collapse shadow-lg">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th class="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Type
                </th>
                <th class="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={categories()}>
                {(category) => (
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-2 text-sm text-gray-700">
                      {category.category_name}
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-700 capitalize">
                      {category.transaction_type}
                    </td>
                    <td class="px-4 py-2 text-sm flex gap-2">
                      <button
                        class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs"
                        onClick={() => {
                          setSelectedCategory(category);
                          setFormData({
                            name: category.category_name,
                            type: category.transaction_type,
                          });
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs"
                        onClick={() => {
                          setSelectedCategory(category);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        ) : (
          <p>No categories found. Click "New Category" to add one.</p>
        )}
      </section>

      {open() && (
        <div class="modal">
          <h2 class="text-xl font-semibold">Add Category</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCategory();
            }}
          >
            <label class="block mt-2">
              Name:
              <input
                type="text"
                value={formData().name}
                class="border p-2 w-full"
                onInput={(e) =>
                  setFormData({
                    ...formData(),
                    name: capitalizeWords(e.currentTarget.value),
                  })
                }
                required
              />
            </label>
            <label class="block mt-2">
              Type:
              <select
                value={formData().type}
                class="border p-2 w-full"
                onChange={(e) =>
                  setFormData({ ...formData(), type: e.currentTarget.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
            <div class="mt-4 flex gap-2">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {editOpen() && selectedCategory() && (
        <div class="modal">
          <h2 class="text-xl font-semibold">Edit Category</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditCategory();
            }}
          >
            <label class="block mt-2">
              Name:
              <input
                type="text"
                value={formData().name}
                class="border p-2 w-full"
                onInput={(e) =>
                  setFormData({ ...formData(), name: e.currentTarget.value })
                }
                required
              />
            </label>
            <label class="block mt-2">
              Type:
              <select
                value={formData().type}
                class="border p-2 w-full"
                onChange={(e) =>
                  setFormData({ ...formData(), type: e.currentTarget.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
            <div class="mt-4 flex gap-2">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteOpen() && selectedCategory() && (
        <div class="modal">
          <h2 class="text-xl font-semibold">Delete Category</h2>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedCategory()?.category_name}</strong>?
          </p>
          <div class="mt-4 flex gap-2">
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleDeleteCategory}
            >
              Delete
            </button>
            <button
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Categories;
