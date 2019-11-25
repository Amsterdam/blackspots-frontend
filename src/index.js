import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/styles.scss';
import './styles/fonts.scss';
require('formdata-polyfill');

const environment = process.env.NODE_ENV;

Sentry.init({
  environment,
  dsn: 'https://45be21450b804b1e85ad7462a529b0f8@sentry.data.amsterdam.nl/24',
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
