import { logout } from '../auth/auth';
import auth from '../auth/auth';

export const getAccessToken = () => auth.keycloak.token;

export const generateParams = data =>
  Object.entries(data)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

const handleErrors = (response, reloadOnUnauthorized) => {
  if (
    response.status >= 400 &&
    response.status <= 401 &&
    reloadOnUnauthorized
  ) {
    logout();
  }
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getByUri = uri => fetch(uri).then(response => response.json());

export const getWithToken = (
  url,
  params,
  cancel,
  token,
  reloadOnUnauthorized = false
) => {
  const headers = {};

  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const options = {
    method: 'GET',
    headers,
  };

  if (cancel) {
    options.signal = cancel;
  }

  const fullUrl = `${url}${params ? `?${generateParams(params)}` : ''}`;
  return fetch(fullUrl, options)
    .then(response => handleErrors(response, reloadOnUnauthorized))
    .then(response => response.json());
};

export const getByUrl = async (url, params, cancel, reloadOnUnauthorized) => {
  const token = getAccessToken();
  return Promise.resolve(
    getWithToken(url, params, cancel, token, reloadOnUnauthorized)
  );
};

const getFormData = data => {
  const formData = new FormData();

  for (const name in data) {
    formData.append(name, data[name]);
  }

  return formData;
};

export const sendData = async (url, data, method = 'POST') => {
  const token = getAccessToken();
  const options = {
    method: 'method',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: getFormData(data),
  };

  return fetch(url, options)
    .then(response => handleErrors(response))
    .then(response => response.json());
};
