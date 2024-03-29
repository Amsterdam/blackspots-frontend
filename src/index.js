/* istanbul ignore file */
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import App from './components/App';
import './styles/styles.scss';

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: 'https://45be21450b804b1e85ad7462a529b0f8@sentry.data.amsterdam.nl/24',
});

// Setup Matomo
const hostname = window && window.location && window.location.hostname;
const matomo = createInstance({
  urlBase: 'https://analytics.data.amsterdam.nl/',
  siteId: hostname === 'wbakaart.amsterdam.nl' ? 22 : 23,
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <MatomoProvider value={matomo}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MatomoProvider>
);
