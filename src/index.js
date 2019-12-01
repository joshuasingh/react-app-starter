import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../src/pages/Homepage";
import Notfound from "../src/pages/Notfound";
import "./styles.css";
import ElaborationPage from "./pages/ElaborationPage";
import AdminPage from "./pages/AdminPage";
import TestFirstPage from "./pages/TestFirstPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AdminLogin from "./pages/AdminLogin";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "./App";
import combineReducer1 from "./rootReducer";

const myLogger = store => next => action => {
  console.log("logged action:", action);
  next(action);
};

const store = createStore(combineReducer1, {});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
