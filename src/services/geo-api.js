import axios from 'axios';

const URL =
  'https://map.data.amsterdam.nl/maps/blackspots?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=blackspots&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326&bbox=4.58565,52.03560,5.31360,52.48769';

export function getAllBlackspots() {
  return axios.get(URL).then(res => res.data);
}
