import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './components/App';
import configureStore from './redux/configureStore';

const store = configureStore();
const target = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
);
