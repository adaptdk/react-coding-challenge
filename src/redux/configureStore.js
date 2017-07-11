import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import subjects from './modules/subjects';
import books from './modules/books';

const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const rootReducer = combineReducers({
  subjects,
  books,
  form,
});

const configureStore = (initialState) => createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default configureStore;
