import {
  Accessor,
  Component,
  Match,
  Setter,
  Suspense,
  Switch,
  createResource,
} from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { setIsLoggedIn } from "../index";
import { getUser } from "../hooks/useFetch";

const SideBar: Component<{
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
}> = (props) => {
  const navigate = useNavigate();
  const [user] = createResource(getUser);

  const logout = async () => {
    try {
      const response = await fetch(
        `//${window.location.host}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );

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
    <aside
      class={`bg-emerald-900 fixed left-0 top-0 shadow-3xl p-5 h-screen ${props.open() ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-500 px-4 w-64 z-50 flex flex-col`}
    >
      <header class="flex justify-end lg:hidden">
        <button
          class="cursor-pointer"
          onClick={() => props.setOpen(!props.open())}
          aria-label="Close Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      <h2 class="mt-2 text-xl text-center">
        <span>Welcome, </span>
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
      <hr class="my-5" />
      <nav class="flex flex-col bg-emerald-100 shadow-inner rounded-lg px-5 py-5 gap-2">
        <A href="/" class="link">
          Home{" "}
        </A>
        <A href="/budget" class="link">
          Budget{" "}
        </A>
        <A href="/transactions" class="link">
          Transactions{" "}
        </A>
        <A href="/reports" class="link">
          Reports{" "}
        </A>
        <A href="/settings" class="link">
          Settings{" "}
        </A>
      </nav>
      <hr class="my-5 botton-0" />
      <button
        onClick={logout}
        class="py-2 px-5 bg-red-500 text-white hover:bg-red-900 rounded-lg"
      >
        Logout
      </button>
    </aside>
  );
};

export default SideBar;
