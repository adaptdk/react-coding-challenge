/* ========== DEPENDENCIES ============= */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "state/index";
import "styles/styles.scss";
/* ========== COMPONENTS ============ */
import Dashboard from "comp/Dashboard";
/* ============ CODE ============== */
const jsx = (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);
const root = document.getElementById("app");

ReactDOM.render(jsx, root);
