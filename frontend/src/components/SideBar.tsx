import { Component, Match, Suspense, Switch, createResource } from "solid-js"
import { useNavigate } from "@solidjs/router";
import { setIsLoggedIn } from "../index";
import { getUser } from "../hooks/useFetch";

const SideBar: Component = () => {
  const navigate = useNavigate();
  const [user] = createResource(getUser)

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
      console.error("Error logging out:", err);
    }
  };

  return (
    <aside class="w-1/4 bg-emerald-900 p-4 ">
      <h2 class="text-xl text-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Match when={user.error}>
              <span>Error: {user.error.message}</span>
            </Match>
            <Match when={user()}>
              <p>{user().name}</p>
            </Match>
          </Switch>
        </Suspense>
      </h2>

      <nav class="flex flex-col gap-2">
        <p>Budget </p>
        <p>Transactions</p>
        <p>Income </p>
        <p>Expenses </p>
        <p>Reports</p>
        <p>User Settings </p>
      </nav>
      <hr class="my-5 botton-0" />
      <button onClick={logout} class="mb-4 p-2 bg-red-500 text-white rounded-lg">
        Logout
      </button>

    </aside>

  )
}

export default SideBar;
