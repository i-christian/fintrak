import { Component } from "solid-js";

const Categories: Component = () => {
  return (
    <main>
      <button class="btn">New</button>
      <p>List of categories, with edit and delete options</p>
      <section class="my-5">
        <ul>
          <li>categories name and type</li>
        </ul>
      </section>
    </main>
  );
};

export default Categories;
