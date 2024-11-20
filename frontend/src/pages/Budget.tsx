import { Component } from "solid-js";

const Budget: Component = () => {
  return (
    <main>
      <button class="btn mb-5">New </button>
      <table class="table-auto min-w-full border border-black rounded-lg shadow-md">
        <caption class="caption-top font-bold mb-2">
          Current Budget Name
        </caption>
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-500 text-left leading-4 text-blue-500 tracking-wider">
              Amount
            </th>
            <th class="px-6 py-3 border-b-2 text-left leading-4 text-blue-500 border-gray-500 tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              100
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              Airtime Money{" "}
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              1000
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              Transport{" "}
            </td>
          </tr>
        </tbody>
      </table>

      <p>List previous budgets </p>
    </main>
  );
};

export default Budget;
