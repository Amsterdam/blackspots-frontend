/* istanbul ignore file */
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line import/no-extraneous-dependencies
import L from 'leaflet-headless';

global.Keycloak = () => ({
  init: () => {},
  realmAccess: {
    roles: [],
  },
});

global.window.L = L;

/**
 * Element.closest() polyfill
 *
 * Both Jest and JSDOM don't offer support for Element.closest()
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest}
 * @see {@link https://github.com/jsdom/jsdom/issues/1555}
 */
window.Element.prototype.closest = function closest(selector) {
  let el = this;
  while (el) {
    if (el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }

  return el;
};

// Mock the window.fetch function
// eslint-disable-next-line import/no-extraneous-dependencies
global.fetch = require('jest-fetch-mock');
