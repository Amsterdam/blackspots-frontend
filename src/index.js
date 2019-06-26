import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import '@babel/polyfill';
import * as Sentry from '@sentry/browser';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import auth from './shared/auth/auth';
import './styles/styles.scss';
import './styles/fonts.scss';

const environment = process.env.NODE_ENV;

Sentry.init({
  environment,
  dsn: 'https://45be21450b804b1e85ad7462a529b0f8@sentry.data.amsterdam.nl/24',
});


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
    return <App authenticated={this.state.authenticated} />;
  }
}

ReactDOM.render(
  <BrowserRouter>
    <KeycloakWrapper keycloak={auth.keycloak} />
  </BrowserRouter>,
  document.getElementById('root')
);
