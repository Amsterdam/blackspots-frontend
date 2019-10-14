import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
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

const KeycloakWrapper = ({ keycloak }) => {
  const [authenticated, setAuthenticatied] = useState(false);

  useEffect(() => {
    console.log('useEffect')
    keycloak.onAuthSuccess = () => {
      setAuthenticatied(true);
    };
    keycloak.onAuthError = () => {
      setAuthenticatied(false);
    };
    keycloak.onAuthRefreshError = () => {
      setAuthenticatied(false);
    };
  }, [keycloak.onAuthError, keycloak.onAuthRefreshError, keycloak.onAuthSuccess]);

  return <App authenticated={authenticated} />;
};

ReactDOM.render(
  <BrowserRouter>
    <KeycloakWrapper keycloak={auth.keycloak} />
  </BrowserRouter>,
  document.getElementById('root')
);
