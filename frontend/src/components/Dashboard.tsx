import { Component } from "solid-js";
import OverViewChart from "./OverViewChart";

const Dashboard: Component = () => {
  return (
    <section>
      <h2 class="text-xl text-end mx-auto my-5">Balance: 100</h2>

      <div class="">
        <p class="text-center text-sm my-2">Expense/Income Overview </p>
        <OverViewChart />
      </div>
    </section>
  )
}

export default Dashboard;
