import { Component, createSignal } from "solid-js";

const Settings: Component = () => {
  const [openEdit, setOpenEdit] = createSignal<boolean>(false);
  const [openDelete, setOpenDelete] = createSignal<boolean>(false);

  return (
    <main class="mt-10 flex flex-col md:flex-row gap-5">
      <div class="shadow-2xl border grow p-5 rounded-2xl ">
        <section>
          <p class="font-bold text-xl">Change Name </p>
          <div
            class={`flex flex-row gap-5 ${openEdit() ? "hidden" : "block"} `}
          >
            <span class="text-xl py-2">User1</span>
            <button onClick={() => setOpenEdit(!openEdit())}>
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
            class={`flex flex-row gap-5 ${!openEdit() ? "hidden" : "block"} `}
          >
            <label for="name">
              New Name:
              <input id="name" class="ml-2 p-1 rounded-md border" type="text" />
            </label>
            <button
              class="bg-emerald-600 hover:bg-emerald-900 rounded-md px-5 text-white w-fit"
              onClick={() => setOpenEdit(!openEdit())}
            >
              Save
            </button>
            <button
              class="bg-red-600 hover:bg-red-900 rounded-md px-5 text-white w-fit"
              onClick={() => setOpenEdit(!openEdit())}
            >
              cancel
            </button>
          </form>
        </section>
        <hr class="my-5" />

        <section>
          <p class="font-bold text-xl my-2">Reset Password</p>
          <form class="flex flex-col">
            <label for="password">
              <input
                id="password"
                class="p-1 rounded-md border"
                type="text"
                placeholder="new password"
              />
            </label>
            <br />
            <label for="confirm">
              <input
                id="confirm"
                class="p-1 rounded-md border"
                type="text"
                placeholder="Confirm Password"
              />
            </label>
            <div class="flex gap-5 ml-2">
              <button class="rounded-md bg-emerald-600 hover:bg-emerald-900 my-2 w-fit px-5">
                Save
              </button>
              <button class="rounded-md bg-red-600 hover:bg-red-900 my-2 w-fit px-5">
                cancel
              </button>
            </div>
          </form>
        </section>
      </div>
      <section class="shadow-2xl border grow p-5 rounded-2xl">
        <h1 class="font-bold text-xl text-red-900"> Account Deactivation </h1>
        <div
          class={`flex flex-row gap-5 ${openDelete() ? "hidden" : "block"} `}
        >
          <span class="text-xl py-2">User1</span>
          <button onClick={() => setOpenDelete(!openDelete())}>
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div
          class={`flex flex-row gap-5 ${!openDelete() ? "hidden" : "block"} `}
        >
          <h1 class="italic">Are you sure you want to delete?</h1>
          <button
            class="bg-emerald-600 hover:bg-emerald-900 rounded-md px-5 text-white w-fit"
            onClick={() => setOpenDelete(!openDelete())}
          >
            YES
          </button>
          <button
            class="bg-red-600 hover:bg-red-900 rounded-md px-5 text-white w-fit"
            onClick={() => setOpenDelete(!openDelete())}
          >
            NO
          </button>
        </div>
      </section>
    </main>
  );
};

export default Settings;
