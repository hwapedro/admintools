import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

import Courses from "../src/components/Courses";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Courses />
    </Router>
  </Provider>,
  document.getElementById("root")
);
