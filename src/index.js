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


// TODO: rewrite to hooks
// TODO: badges



ReactDOM.render(
  <Provider store={store}>
  <DragDropContext onDragEnd = {result => console.log(result)}>
   <DragDropContextProvider backend={HTML5Backend}>
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <App />
        </Router>
        <GlobalStyle />
      </>
    </ThemeProvider>
    </DragDropContextProvider>
    </DragDropContext>
  </Provider>,
  document.getElementById("root")
);
