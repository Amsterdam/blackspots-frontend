import { useState, useEffect } from 'react';
import auth from '../auth/auth';

const useKeycloak = () => {
  const [authenticated, setAuthenticatied] = useState(false);
  const keycloak = auth.keycloak;

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      setAuthenticatied(true);
    };
    keycloak.onAuthError = () => {
      setAuthenticatied(false);
    };
    keycloak.onAuthRefreshError = () => {
      setAuthenticatied(false);
    };
  }, [
    keycloak.onAuthError,
    keycloak.onAuthRefreshError,
    keycloak.onAuthSuccess,
  ]);

  return authenticated;
};

export default useKeycloak;
