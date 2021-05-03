import React, { lazy, Suspense } from "react";
import { routes } from "./List.js";
import AppContextProvider from "../../AppContext.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "../Spinner.jsx";

const Routes = () => (
  <Router>
    <Suspense fallback={<Spinner loading={true} />}>
      <AppContextProvider>
        <Switch>
          {routes.map((route) => (
            <Route
              path={route.path}
              component={route.component}
              exact={route.exact}
              key={route.key}
            />
          ))}
        </Switch>
      </AppContextProvider>
    </Suspense>
  </Router>
);

export default Routes;
