/* istanbul ignore file */
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
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

// Setup Matomo
const hostname = window && window.location && window.location.hostname;
const matomo = createInstance({
  urlBase: 'https://analytics.data.amsterdam.nl/',
  siteId: hostname === 'wbakaart.amsterdam.nl' ? 22 : 23,
});

ReactDOM.render(
  <MatomoProvider value={matomo}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MatomoProvider>,
  document.getElementById('root')
);
