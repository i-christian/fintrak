import { Component } from "solid-js";
import OverViewChart from "./OverViewChart";

const Dashboard: Component = () => {
  return (
    <section>
      <header>Your overview</header>
      <OverViewChart />
    </section>
  )
}

export default Dashboard;
