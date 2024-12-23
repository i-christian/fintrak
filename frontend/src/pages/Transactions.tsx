import { Component, createResource, Match, Suspense, Switch } from "solid-js";
import { getTotals } from "../hooks/useFetch";
import Summary from "../components/Summary";

const Transactions: Component = () => {
  const [total, { refetch }] = createResource(getTotals);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Match when={total.state === "errored"}>
            <span class="text-red-500 text-xl bg-slate-200 p-4 m-2">
              Error loading data
            </span>
          </Match>
          <Match when={total.state === "ready"}>
            <Summary total={total} />
          </Match>
        </Switch>
      </Suspense>

      <div class="flex gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
        <button class="btn" onClick={() => refetch()}>
          New
        </button>
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
