import { useState, useEffect } from 'react';
import auth from '../auth/auth';

const useKeycloak = () => {
  const [authenticated, setAuthenticatied] = useState(false);
  const [roles, setRoles] = useState([]);
  const keycloak = auth.keycloak;

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      setAuthenticatied(true);
      setRoles(keycloak.realmAccess.roles);
    };
    keycloak.onAuthError = () => {
      setAuthenticatied(false);
      setRoles([]);
    };
    keycloak.onAuthRefreshError = () => {
      setAuthenticatied(false);
      setRoles([]);
    };
  }, [
    keycloak.onAuthError,
    keycloak.onAuthRefreshError,
    keycloak.onAuthSuccess,
    keycloak.realmAccess,
  ]);

  return { authenticated, roles };
};

export default useKeycloak;
