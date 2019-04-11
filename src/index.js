import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-beautiful-dnd";

import store from "./store";
import GlobalStyle from "./components/GlobalStyles";
import { theme } from "./styles/theme";

import App from "../src/components/App";

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <Router>
            <App />
          </Router>
          <GlobalStyle />
        </>
      </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
