import { Component, createSignal, Match, Suspense, Switch } from "solid-js";
import { user } from "../index";
import { editUser, deleteUser } from "../hooks/useFetch";
import { useNavigate } from "@solidjs/router";

const Settings: Component = () => {
  const [openEdit, setOpenEdit] = createSignal<boolean>(false);
  const [openDelete, setOpenDelete] = createSignal<boolean>(false);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [formData, setFormData] = createSignal({ name: "", password: "" });

  const navigate = useNavigate();

  const handleEditUser = async () => {
    setLoading(true);
    try {
      const { name, password } = formData();
      await editUser(name || null, password || null);
      setOpenEdit(false);
    } catch (error) {
      console.error("Failed to update user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser();
      localStorage.removeItem("isLoggedIn");
      navigate("/register");
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return (
    <main class="mt-10 flex flex-col md:flex-row gap-5">
      <div class="shadow-2xl border grow p-5 rounded-2xl">
        <section>
          <p class="font-bold text-xl">Change Name </p>
          <div
            class={`flex flex-row gap-5 ${openEdit() ? "hidden" : "block"} `}
          >
            <span class="text-xl py-2">
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Match when={user.error}>
                    <span>Anonymous User</span>
                  </Match>
                  <Match when={user()}>
                    <p>{user().name}</p>
                  </Match>
                </Switch>
              </Suspense>
            </span>
            <button onClick={() => setOpenEdit(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
          <form
            class={`flex flex-col gap-4 ${!openEdit() ? "hidden" : "block"} `}
            onSubmit={(e) => {
              e.preventDefault();
              handleEditUser();
            }}
          >
            <label for="name" class="flex flex-col">
              <span>New Name:</span>
              <input
                id="name"
                class="p-2 border rounded-md"
                type="text"
                onInput={(e) =>
                  setFormData({ ...formData(), name: e.currentTarget.value })
                }
              />
            </label>
            <label for="password" class="flex flex-col">
              <span>New Password:</span>
              <input
                id="password"
                class="p-2 border rounded-md"
                type="password"
                onInput={(e) =>
                  setFormData({
                    ...formData(),
                    password: e.currentTarget.value,
                  })
                }
              />
            </label>
            <div class="flex gap-5">
              <button
                type="submit"
                class={`bg-emerald-600 hover:bg-emerald-900 px-5 py-2 rounded-md text-white ${
                  loading() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading()}
              >
                Save
              </button>
              <button
                type="button"
                class="bg-red-600 hover:bg-red-900 px-5 py-2 rounded-md text-white"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>

      <section class="shadow-2xl border grow p-5 rounded-2xl">
        <h1 class="font-bold text-xl text-red-900">Account Deactivation</h1>
        <div
          class={`flex flex-row gap-5 ${openDelete() ? "hidden" : "block"} `}
        >
          <button
            class="bg-red-600 hover:bg-red-900 px-5 py-2 rounded-md text-white"
            onClick={() => setOpenDelete(true)}
          >
            Deactivate Account
          </button>
        </div>
        <div
          class={`flex flex-row gap-5 ${!openDelete() ? "hidden" : "block"} `}
        >
          <h1 class="italic">Are you sure you want to delete your account?</h1>
          <button
            class={`bg-emerald-600 hover:bg-emerald-900 px-5 py-2 rounded-md text-white ${
              loading() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDeleteUser}
            disabled={loading()}
          >
            Yes
          </button>
          <button
            class="bg-red-600 hover:bg-red-900 px-5 py-2 rounded-md text-white"
            onClick={() => setOpenDelete(false)}
          >
            No
          </button>
        </div>
      </section>
    </main>
  );
};

export default Settings;
