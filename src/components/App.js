import React from "react";
import { Switch, Route } from "react-router-dom";

import { AppStyled, Content } from "./App.styled";
import Header from "./header/Header";
import DashboardPage from "views/dashboard/DashboardPage";
import ConceptPage from "views/concepts/ConceptPage";
import ContactPage from "views/contact/ContactPage";
import { appRoutes } from "constants.js";

class App extends React.Component {
  render() {
    return (
      <AppStyled>
        <Header />
        <Content>
          <Switch>
            <Route exact path={appRoutes.CONCEPTS} component={ConceptPage} />
            <Route exact path={appRoutes.CONTACT} component={ContactPage} />
            <Route path={appRoutes.HOME} component={DashboardPage} />
          </Switch>
        </Content>
      </AppStyled>
    );
  }
}

export default App;
