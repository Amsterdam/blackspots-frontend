import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import theme from "theme";
import GlobalStyle from "globalStyle";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <React.Fragment>
        <GlobalStyle />
        <App />
      </React.Fragment>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
