import { useState, useEffect } from 'react';
import auth from '../auth/auth';

const useKeycloak = () => {
  const [authenticated, setAuthenticatied] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  useEffect(() => {
    (async () => {
      setAuthenticatied(await auth.isAuthenticated());
      setCanAdd(await auth.canAdd());
      setCanEdit(await auth.canEdit());
    })();
  }, [auth]);

  return { authenticated, canAdd, canEdit };
};

export default useKeycloak;
