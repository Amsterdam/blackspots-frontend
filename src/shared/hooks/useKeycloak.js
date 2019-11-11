import { useState, useEffect } from 'react';
import auth from '../auth/auth';

const useKeycloak = () => {
  const [authenticated, setAuthenticatied] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const keycloak = auth.keycloak;

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      setAuthenticatied(true);
      const { roles } = keycloak.realmAccess || [];
      setCanEdit(roles.includes('bs_all'));
      setCanAdd(roles.includes('bs_all'));
    };
    keycloak.onAuthError = () => {
      setAuthenticatied(false);
      setCanAdd(false);
      setCanEdit(false);
    };
    keycloak.onAuthRefreshError = () => {
      setAuthenticatied(false);
      setCanAdd(false);
      setCanEdit(false);
    };
  }, [
    keycloak.onAuthError,
    keycloak.onAuthRefreshError,
    keycloak.onAuthSuccess,
    keycloak.realmAccess,
  ]);

  return { authenticated, canAdd, canEdit };
};

export default useKeycloak;
