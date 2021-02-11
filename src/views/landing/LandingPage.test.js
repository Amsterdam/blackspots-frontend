import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import auth from 'shared/auth/auth';

import LandingPage from './LandingPage';

jest.mock('shared/auth/auth');

describe('LandingPage', () => {
  it('should render correctly', () => {
    const { container, queryByTestId, getByText } = render(<LandingPage />);

    // Header is renderd
    expect(container.querySelector('div.Header')).toBeInTheDocument();

    // More info link is rendered
    expect(
      container.querySelector(
        'a[href="http://amsterdam.nl/verkeersveiligheid"]'
      )
    ).toBeInTheDocument();

    const element = getByText('http://amsterdam.nl/verkeersveiligheid')
      .parentNode;
    expect(element.tagName).toEqual('P');

    // Login button is renederd
    expect(queryByTestId('login-button')).toBeInTheDocument();

    // Account request instrictions link is rendered
    expect(getByText('WBAkaart.V&OR@amsterdam.nl')).toBeInTheDocument();
    expect(getByText('WBAkaart.V&OR@amsterdam.nl').tagName).toBe('A');
    expect(
      getByText('WBAkaart.V&OR@amsterdam.nl').getAttribute('href')
    ).toEqual('mailto:WBAkaart.V&OR@amsterdam.nl');
  });

  it('should login on datapunt when Inloggen button is clicked', () => {
    const loginMock = jest.spyOn(auth, 'login');
    const { queryByText } = render(<LandingPage />);
    expect(queryByText('Datapunt account')).toBeInTheDocument();
    const button = queryByText('Datapunt account');
    expect(button.getAttribute('type')).toEqual('button');

    fireEvent.click(button);

    expect(loginMock).toHaveBeenCalled();
  });
});
