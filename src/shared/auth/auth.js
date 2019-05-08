import { shouldUseAccEnv } from 'helpers.js';

// See: https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter

const config = {
  realm: shouldUseAccEnv() ? 'datapunt-acc' : 'datapunt',
  url: 'https://iam.amsterdam.nl/auth',
  clientId: 'blackspots',
};

const keycloak = window.Keycloak(config);

const setupKeycloack = () => {
  keycloak.init({
    onLoad: 'login-required',
  });

  return {
    keycloak,
  };
};

export default setupKeycloack();
