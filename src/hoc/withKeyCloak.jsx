import React, { useState, useEffect } from 'react';
import auth from '../shared/auth/auth';

const withKeycloak = Component => () => {
  const [authenticated, setAuthenticatied] = useState(false);
  const keycloak = auth.keycloak;

  useEffect(() => {
    console.log('useEffect');
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

  return <Component authenticated={authenticated} />;
};

export default withKeycloak
