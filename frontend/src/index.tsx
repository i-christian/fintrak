import { render } from "solid-js/web";
import { Route, Router, Navigate } from "@solidjs/router";
import {
  Component,
  createResource,
  createSignal,
  lazy,
  onMount,
} from "solid-js";
import { getUser } from "./hooks/useFetch";

import Login from "./pages/Login";
import Register from "./pages/Register";

const Home = lazy(() => import("./pages/Home"));
const WrongPage = lazy(() => import("./pages/404"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Budget = lazy(() => import("./pages/Budget"));
const Categories = lazy(() => import("./pages/Categories"));

//should be set to false
export const [isLoggedIn, setIsLoggedIn] = createSignal(true);
export const [user] = createResource(getUser);

const App: Component = () => {
  // onMount(async () => {
  //   if (localStorage.getItem("isLoggedIn") === "true") {
  //     try {
  //       const response = await fetch(`//${window.location.host}/api/check`, {
  //         method: "GET",
  //         credentials: "include"
  //       });

  //       if (response.ok) {
  //         setIsLoggedIn(true);
  //         localStorage.setItem("isLoggedIn", "true");
  //       } else {
  //         setIsLoggedIn(false);
  //         localStorage.removeItem("isLoggedIn");
  //       }
  //     } catch (error) {
  //       console.error("Auth check error:", error);
  //       setIsLoggedIn(false);
  //     }
  //   }
  //   setIsLoggedIn(false);
  // });

  return (
    <Router>
      <Route path="/" component={Home}>
        <Route path="/" component={Dashboard} />
      </Route>
      <Route path="/settings" component={Home}>
        <Route path="/" component={Settings} />
      </Route>
      <Route path="/budget" component={Home}>
        <Route path="/" component={Budget} />
      </Route>
      <Route path="/categories" component={Home}>
        <Route path="/" component={Categories} />
      </Route>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" component={WrongPage} />
    </Router>
  );
};

export default App;

render(() => <App />, document.getElementById("root") as HTMLElement);
