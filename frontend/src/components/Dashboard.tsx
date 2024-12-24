import { Component } from "solid-js";
import OverViewChart from "./OverViewChart";

const Dashboard: Component = () => {
  return (
    <section>
      <div class="">
        <p class="text-center text-xl my-5">Expense/Income Overview </p>
        <OverViewChart />
      </div>
    </section>
  );
};

export default Dashboard;
