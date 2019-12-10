const config = {
  realm: process.env.REACT_APP_AUTH_REALM,
  url: process.env.REACT_APP_AUTH_ROOT,
  clientId: 'blackspots',
};

// See: https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
const keycloak = window.Keycloak(config);

export const logout = () => {
  keycloak.logout();
};

const setupKeycloack = () => {
  keycloak.init({ onLoad: 'check-sso' });

  return {
    keycloak,
  };
};

const auth = setupKeycloack();

export default auth;
