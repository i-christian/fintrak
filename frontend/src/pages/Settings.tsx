import { Component } from "solid-js";

const Settings: Component = () => {
  return (
    <main class="mt-10 flex flex-col gap-5">
      <div class="shadow-2xl border p-5 rounded-2xl">
        <section>
          <p>Change Name </p>
          <span >User1</span>
          <button class="pl-2">
            save
          </button>
        </section>
        <hr class="my-5" />
        <section>
          <p>Reset Password</p>
          <form class="flex flex-col">
            <label for="password">Password:<input id="password" type="text" />
            </label> <br />

            <label for="confirm">Password:<input id="confirm" type="text" />
            </label>
            <button class="btn">Save</button>
          </form>
        </section>
      </div>
      <section>Delete Account</section>
    </main>
  )
}

export default Settings;
