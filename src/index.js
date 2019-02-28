import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { ThemeProvider } from "styled-components";
import theme from "theme";
import GlobalStyle from "globalStyle";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <App />
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById("root")
);
