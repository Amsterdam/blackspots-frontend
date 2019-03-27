import axios from 'axios';

const URL =
  'https://acc.api.data.amsterdam.nl/blackspots/spots/?format=geojson';

export function getAllBlackspots() {
  return axios.get(URL).then(res => res.data);
}
