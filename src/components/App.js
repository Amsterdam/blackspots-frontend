import React from "react";
import { Switch, Route } from "react-router-dom";

import { AppStyled } from "./App.styled";
import Header from "./header/Header";
import DashboardPage from "views/dashboard/dashboardPage";
import ConceptPage from "views/concepts/conceptPage";
import ContactPage from "views/contact/contactPage";
import { appRoutes } from "constants.js";

class App extends React.Component {
  render() {
    return (
      <AppStyled>
        <Header />
        <Switch>
          <Route exact path={appRoutes.CONCEPTS} component={ConceptPage} />
          <Route exact path={appRoutes.CONTACT} component={ContactPage} />
          <Route path={appRoutes.HOME} component={DashboardPage} />
        </Switch>
      </AppStyled>
    );
  }
}

export default App;
