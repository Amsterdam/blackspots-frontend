import auth from 'shared/auth/auth';

export const getAllBlackspots = (endpoint) =>{
  // TODO: Refresh Keycloak token
  const token = auth.keycloak.token;
  return fetch(endpoint, {
    headers: new Headers({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    }),
  }).then(response => response.json());
}
