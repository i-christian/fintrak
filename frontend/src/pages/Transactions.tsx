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
      <p>Monthly transactions, with edit and delete options</p>
      <section class="my-5">
        <ul>
          <li>transactions date, amount, type and notes/desc</li>
        </ul>
      </section>
    </main>
  );
};

export default Transactions;
