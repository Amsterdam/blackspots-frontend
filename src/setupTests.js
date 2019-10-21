import '@testing-library/jest-dom/extend-expect';
import L from 'leaflet-headless';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.Keycloak = () => ({
  init: () => {},
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
