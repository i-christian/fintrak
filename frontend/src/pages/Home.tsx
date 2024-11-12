import { Component } from "solid-js";
import SideBar from "../components/SideBar";


const Home: Component = () => {
  return (
    <div class="flex h-screen">
      <SideBar />
      <main class="flex-1 flex primary_bg flex-col p-4">
        Main section
      </main>
    </div>
  );
};

export default Home;
