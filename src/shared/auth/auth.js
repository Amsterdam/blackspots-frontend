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
      onLoad: 'check-sso', // To enable refresh token
    };

    return keycloak.init(options);
  };

  const isReady = new Promise((resolve, reject) => {
    // This is executed during load of this module
    // The promise is awaited in the other methods to be sure that keycloak has been initialised
    try {
      init();
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
    return keycloak.token;
  };

  let keepAlive = null;

  const autoRefreshToken = turnOn => {
    // Refresh the token automatically once the user has been authenticated
    // Turn off when the user has logged out
    const minValidity = 30; // Token should be valid for at least the next 30 seconds
    const updateInterval = minValidity * 0.75; // Keep token valid by checking regularly
    if (turnOn) {
      // Start a token updater, if not yet running
      keepAlive =
        keepAlive ||
        setInterval(
          () => keycloak.updateToken(minValidity),
          updateInterval * 1000
        );
    } else {
      if (keepAlive) clearInterval(keepAlive);
      keepAlive = null;
    }
  };

  // keycloak.onReady = authenticated => {
  //   console.log('Keycloak ready, authenticated', authenticated);
  // };

  keycloak.onAuthSuccess = () => {
    // console.log('Auth success');
    autoRefreshToken(true);
  };

  keycloak.onAuthError = () => {
    // console.log('Auth error');
    autoRefreshToken(false);
  };

  keycloak.onAuthRefreshSuccess = () => {
    // console.log('Auth refresh success');
  };

  keycloak.onAuthRefreshError = () => {
    // console.log('Auth refresh error');
    autoRefreshToken(false);
  };

  keycloak.onAuthLogout = () => {
    // console.log('Auth logout');
    autoRefreshToken(false);
  };

  keycloak.onTokenExpired = () => {
    // This should never happen
    // console.log('Unexpected: Token expired');
    autoRefreshToken(false);
  };

  return {
    keycloak,
    login,
    token,
    userInfo,
    logout,
    autoRefreshToken,
  };
};

const { keycloak, ...auth } = setupKeycloack();

export { keycloak };

export default auth;
