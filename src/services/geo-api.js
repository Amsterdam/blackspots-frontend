import auth from 'shared/auth/auth';
import { shouldUseAccEnv } from 'helpers.js';

const URL = `https://${
  shouldUseAccEnv() ? 'acc.' : ''
}api.data.amsterdam.nl/blackspots/spots/?format=geojson`;

export const getAllBlackspots = () =>{
  // TODO: Refresh Keycloak token
  const token = auth.keycloak.token;
  return fetch(URL, {
    headers: new Headers({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    }),
  }).then(response => response.json());
}
