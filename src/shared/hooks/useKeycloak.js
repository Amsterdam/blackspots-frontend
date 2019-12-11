import { useState, useEffect } from 'react';
import auth, { keycloak } from '../auth/auth';

const useKeycloak = () => {
  const [authenticated, setAuthenticatied] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const { autoRefreshToken } = auth;

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      autoRefreshToken(true);
      setAuthenticatied(true);
      const { roles } = keycloak.realmAccess || [];
      setCanEdit(roles.includes('bs_all'));
      setCanAdd(roles.includes('bs_all'));
    };
    keycloak.onAuthError = () => {
      autoRefreshToken(false);
      setAuthenticatied(false);
      setCanAdd(false);
      setCanEdit(false);
    };
    keycloak.onAuthRefreshError = () => {
      autoRefreshToken(false);
      setAuthenticatied(false);
      setCanAdd(false);
      setCanEdit(false);
    };
    keycloak.onAuthRefreshSuccess = () => {
      setAuthenticatied(true);

      const { roles } = keycloak.realmAccess || [];
      setCanEdit(roles.includes('bs_all'));
      setCanAdd(roles.includes('bs_all'));
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
