import { Component, createSignal } from "solid-js";

const Settings: Component = () => {
  const [open, setOpen] = createSignal<boolean>(false);

  return (
    <main class="mt-10 flex flex-col gap-5">
      <div class="shadow-2xl border p-5 rounded-2xl">
        <section>
          <p>Change Name </p>
          <div class={`flex flex-row gap-5 ${open() ? "hidden" : "block"} `}>
            <span class="text-xl py-2">User1</span>
            <button onClick={() => setOpen(!open())}>
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
          <form class={`flex flex-row gap-5 ${!open() ? "hidden" : "block"} `}>
            <label for="name">
              New Name:
              <input id="name" class="ml-2 rounded-md border" type="text" />
            </label>
            <button
              class="bg-emerald-600 hover:bg-emerald-900 rounded-md px-5 text-white w-fit"
              onClick={() => setOpen(!open())}
            >
              Save
            </button>
          </form>
        </section>
        <hr class="my-5" />
        <section>
          <p>Reset Password</p>
          <form class="flex flex-col">
            <label for="password">
              Password:
              <input id="password" type="text" />
            </label>
            <br />
            <label for="confirm">
              Password:
              <input id="confirm" type="text" />
            </label>
            <button class="btn">Save</button>
          </form>
        </section>
      </div>
      <section>Delete Account</section>
    </main>
  );
};

export default Settings;
