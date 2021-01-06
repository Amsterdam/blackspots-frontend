const setupKeycloack = () => {
  const config = {
    realm: process.env.REACT_APP_AUTH_REALM,
    url: process.env.REACT_APP_AUTH_ROOT,
    clientId: 'blackspots',
  };

  const keycloak = window.Keycloak(config);

  const init = () => {
    const options = {
      promiseType: 'native', // To enable async/await
      'check-sso': false, // To enable refresh token
      checkLoginIframe: false, // To enable refresh token
      onLoad: 'check-sso',
    };

    return keycloak.init(options);
  };

  // eslint-disable-next-line no-async-promise-executor
  const isReady = new Promise(async (resolve, reject) => {
    // This is executed during load of this module
    // The promise is awaited in the other methods to be sure that keycloak has been initialised
    try {
      await init();
      resolve();
    } catch (e) {
      reject();
    }
  });

  const login = async () => {
    await isReady;
    return keycloak.login();
  };

  const logout = async () => {
    await isReady;
    return keycloak.logout();
  };

  const userInfo = async () => {
    await isReady;
    if (keycloak.authenticated) {
      return keycloak.loadUserInfo();
    }
    return null;
  };

  const token = async () => {
    await isReady;
    return keycloak.token && `Bearer ${keycloak.token}`;
  };

  let keepAlive = null;

  const autoRefreshToken = turnOn => {
    // Refresh the token automatically once the user has been authenticated
    // Turn off when the user has logged out
    const minValidity = 30; // Token should be valid for at least the next 30 seconds
    const updateInterval = minValidity * 0.5; // Keep token valid by checking regularly
    if (turnOn) {
      // Start a token updater, if not yet running
      keepAlive =
        keepAlive ||
        setInterval(() => {
          keycloak.updateToken(minValidity);
        }, updateInterval * 1000);
    } else {
      if (keepAlive) clearInterval(keepAlive);
      keepAlive = null;
    }
  };

  keycloak.onReady = authenticated => {
    // eslint-disable-next-line no-console
    console.log('Keycloak ready, authenticated', authenticated);
  };

  keycloak.onAuthSuccess = () => {
    autoRefreshToken(true);
  };

  keycloak.onAuthError = () => {
    autoRefreshToken(false);
  };

  keycloak.onAuthRefreshError = () => {
    autoRefreshToken(false);
  };

  const isAuthenticated = async () => {
    await isReady;
    return keycloak.authenticated;
  };

  const canAdd = async () => {
    await isReady;
    const { roles } = keycloak.realmAccess || { roles: [] };
    return roles.includes('bs_w');
  };

  const canEdit = async () => {
    await isReady;
    const { roles } = keycloak.realmAccess || { roles: [] };
    return roles.includes('bs_w');
  };

  return {
    login,
    token,
    userInfo,
    logout,
    autoRefreshToken,
    isAuthenticated,
    canAdd,
    canEdit,
  };
};

const auth = setupKeycloack();

export default auth;
