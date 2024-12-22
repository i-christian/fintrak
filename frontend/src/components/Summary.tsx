import { Component } from "solid-js";

const Summary: Component = () => {
  return (
    <section class="p-2 border bg-slate-200 rounded-md">
      <header class="text-center text-bold text-2xl">Monthly Summary</header>
      <div class="mt-5 ml-5 text-md">
        <p class="text-blue-800">Total Income: 200 </p>
        <p class="text-red-800">Total Expenses: 180 </p>
      </div>
    </section>
  );
};

export default Summary;
