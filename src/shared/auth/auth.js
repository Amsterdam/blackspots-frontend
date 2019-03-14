// See: https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
const keycloak = window.Keycloak();

const setupKeycloack = () => {

  keycloak.init({
    onLoad: 'login-required'
  });

  return {
    keycloak
  }
};

export default setupKeycloack();
