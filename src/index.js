import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';

const middleware = [thunk];
middleware.push(createLogger());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
