/* ========== DEPENDENCIES =========== */
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "state/reducers/index";
/* -------------------------------------
 ------------ REDUX STORE -----------
 ---------------------------------------*/
// localStorage.clear();
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk)),
);
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
