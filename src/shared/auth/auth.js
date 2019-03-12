const setupKeycloack = () => {
  const keycloak = window.Keycloak();

  const login = () => {
    keycloak.init({ onLoad: 'login-required' });
  };

  return {
    login,
    keycloak
  }
};

export default setupKeycloack();
