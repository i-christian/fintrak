import { render } from "solid-js/web";
import { Route, Router, Navigate } from "@solidjs/router";
import { Component, createResource, createSignal, onMount } from "solid-js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WrongPage from "./pages/404";
import Dashboard from "./components/Dashboard";
import Settings from "./pages/Settings";
import { getUser } from "./hooks/useFetch";
import Budget from "./pages/Budget";
import Categories from "./pages/Categories";

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
