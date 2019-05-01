// See: https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter

const config = {
  realm: "datapunt-acc",
  url: "https://iam.amsterdam.nl/auth",
  clientId: "blackspots",
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
