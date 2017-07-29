import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// render the main component
ReactDOM.render(
  <AppContainer>
    <MuiThemeProvider>
      <Provider store={store}>
        {router}
      </Provider>
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);
