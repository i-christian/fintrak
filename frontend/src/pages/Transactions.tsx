import { Component } from "solid-js";
import Summary from "../components/Summary";

const Transactions: Component = () => {
  return (
    <main>
      <Summary />
      <div class="flex gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
        <button class="btn">New</button>
        <button class="btn">Filter</button>
      </div>
      <p class="mt-5 py-2 border-t-2 border-black text-center text-xl">
        Recent transactions
      </p>
      <section>
        <ul>
          <li>transactions date, amount, type and notes/desc</li>
        </ul>
      </section>
    </main>
  );
};

export default Transactions;
