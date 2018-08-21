import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import modules from "./reducers";
import tableMiddleware from './middlewares/table_middleware';

const middlewares = [tableMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const reducers = combineReducers(Object.assign({}, modules));

export default function setUpStore() {
  const state = localStorage.getItem("storeState");
  return getStorage(state);
}

function getStorage(state) {
  if (state) {
    const jsonState = JSON.parse(state);
    const store = createStore(reducers, jsonState, compose(...enhancers));
    global.store = store;
    return store;
  } else {
    const store = createStore(reducers, {}, compose(...enhancers));
    global.store = store;
    return store;
  }
}
