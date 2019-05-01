import auth from 'shared/auth/auth';

const URL =
  'https://acc.api.data.amsterdam.nl/blackspots/spots/?format=geojson';

export function getAllBlackspots() {
  // TODO: Refresh Keycloak token
  const token = auth.keycloak.token;
  return fetch(URL, {
    headers: new Headers({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    })
  })
    .then(response => response.json());
}
