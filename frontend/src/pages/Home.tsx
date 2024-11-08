import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { setIsLoggedIn } from "../index";


const Home: Component = () => {
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`//${window.location.host}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 500) {
        console.log("Internal server error");
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");

      }

    } catch (err) {
      setError("Error logging out")
      console.error("Error logging out:", err);
    }
  };


  return (
    <div class="flex h-screen">
      <aside class="w-1/4 bg-gray-200 p-4 border-r border-gray-300">
        <h2 class="text-xl font-semibold mb-4">Available Rooms</h2>
        {error() && <p class="text-red-500">{error()}</p>}
        <button onClick={logout} class="mb-4 p-2 bg-red-500 text-white rounded-lg">
          Logout
        </button>
        <ul class="space-y-2">
          Aside navigation
        </ul>
      </aside>
      <main class="flex-1 flex flex-col p-4">
        Main section
      </main>
    </div>
  );
};

export default Home;
