import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { Router } from "react-router-dom";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import history from "./history";

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
