import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import allReducers from "./store/reducers";
import Router from "./components/router";

export const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
