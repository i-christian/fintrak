import { render } from "solid-js/web";
import { Route, Router, Navigate } from "@solidjs/router";
import { Component, createSignal, onMount } from "solid-js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WrongPage from "./pages/404";
import Dashboard from "./components/Dashboard";

//should be set to false
export const [isLoggedIn, setIsLoggedIn] = createSignal(true);

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
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" component={WrongPage} />
    </Router >
  );
};

export default App;

render(() => <App />, document.getElementById("root") as HTMLElement);
