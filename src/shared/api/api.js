import objectToFormData from 'shared/util/objectToFormData';
import auth from '../auth/auth';

export const ApiException = (status, reason) => {
  return {
    status,
    reason,
  };
};

export const generateParams = data =>
  Object.entries(data)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

const handleErrors = async (response, reloadOnUnauthorized) => {
  if (
    reloadOnUnauthorized &&
    response.status >= 400 &&
    response.status <= 401
  ) {
    auth.logout();
  }

  if (!response.ok) {
    const reason = await response.json();
    throw new ApiException(response.status, reason);
  }

  return response;
};

export const getByUri = uri => fetch(uri).then(response => response.json());

export const getWithToken = (
  url,
  type,
  params,
  cancel,
  token,
  reloadOnUnauthorized = false
) => {
  const headers = {};

  if (token) {
    headers.Authorization = token;
  }

  const options = {
    method: 'GET',
    headers,
  };

  if (cancel) {
    options.signal = cancel;
  }

  const fullUrl = `${url}${params ? `?${generateParams(params)}` : ''}`;

  const data = fetch(fullUrl, options);
  if (type === 'json') {
    return data
      .then(response => handleErrors(response, reloadOnUnauthorized))
      .then(response => response.json());
  }
  return data
    .then(response => handleErrors(response, reloadOnUnauthorized))
    .then(response => response.blob());
};

export const getByUrl = async (
  url,
  type,
  params,
  cancel,
  reloadOnUnauthorized
) => {
  // Ensure authenticated
  const token = await auth.token();
  return Promise.resolve(
    getWithToken(url, type, params, cancel, token, reloadOnUnauthorized)
  );
};

export const sendData = async (url, data, method = 'POST') => {
  // Ensure authenticated
  const token = await auth.token();

  const options = {
    method,
    headers: {
      Authorization: token,
    },
    body: objectToFormData(data),
  };

  return fetch(url, options)
    .then(response => handleErrors(response))
    .then(response => response.json());
};
