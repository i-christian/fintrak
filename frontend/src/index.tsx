import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import {
  Component,
  createResource,
  createSignal,
  lazy,
  onMount,
  ParentComponent,
} from "solid-js";
import { getUser } from "./hooks/useFetch";

import Login from "./pages/Login";
import Register from "./pages/Register";

const Home: ParentComponent = lazy(() => import("./pages/Home"));
const WrongPage: Component = lazy(() => import("./pages/404"));
const Dashboard: Component = lazy(() => import("./components/Dashboard"));
const Settings: Component = lazy(() => import("./pages/Settings"));
const Categories: Component = lazy(() => import("./pages/Categories"));
const Transactions: Component = lazy(() => import("./pages/Transactions"));

export const [isLoggedIn, setIsLoggedIn] = createSignal(false);
export const [user, { refetch }] = createResource(getUser);

const App: Component = () => {
  onMount(async () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      try {
        const response = await fetch(`//${window.location.host}/api/check`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
      }
    }
    setIsLoggedIn(false);
  });

  return (
    <Router>
      <Route path="/" component={Home}>
        <Route path="/" component={Dashboard} />
      </Route>
      <Route path="/settings" component={Home}>
        <Route path="/" component={Settings} />
      </Route>
      <Route path="/categories" component={Home}>
        <Route path="/" component={Categories} />
      </Route>
      <Route path="/transactions" component={Home}>
        <Route path="/" component={Transactions} />
      </Route>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" component={WrongPage} />
    </Router>
  );
};

export default App;

render(() => <App />, document.getElementById("root") as HTMLElement);
