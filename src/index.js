import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import theme from 'theme';
import GlobalStyle from 'globalStyle';

import auth from './shared/auth/auth';

class KeycloakWrapper extends React.Component {
  state = { authenticated: false };

  componentDidMount() {
    const keycloak = this.props.keycloak;
    keycloak.onAuthSuccess = () => {
      this.setState({ authenticated: true });
    };
    keycloak.onAuthError = () => {
      this.setState({ authenticated: false });
    };
    keycloak.onAuthRefreshError = () => {
      this.setState({ authenticated: false });
    };
  }

  render() {
    if (this.state.authenticated) {
      return this.props.children;
    } else {
      return '';
    }
  }
}

ReactDOM.render(
  <KeycloakWrapper keycloak={auth.keycloak}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.Fragment>
          <GlobalStyle />
          <App />
        </React.Fragment>
      </BrowserRouter>
    </ThemeProvider>
  </KeycloakWrapper>,
  document.getElementById('root')
);
