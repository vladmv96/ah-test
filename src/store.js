import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import modules from "./reducers";
import sortValuesMiddleware from './middlewares/sort_values_middleware';
import arrowValuesMiddleware from './middlewares/arrow_values_middleware';
import sortTableMiddleware from './middlewares/sort_table_middleware';

const middlewares = [sortValuesMiddleware, arrowValuesMiddleware, sortTableMiddleware];

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
