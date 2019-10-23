import { renderHook, act } from '@testing-library/react-hooks';
import useKeycloak from './useKeycloak';
import auth from '../auth/auth';

describe('useKeycloak', () => {
  it('should set the authenticated flag depending on the keycloak authorization callback', () => {
    const { result } = renderHook(() => useKeycloak());
    const user = result.current;
    expect(user.authenticated).toEqual(false);
    expect(auth.keycloak.onAuthSuccess).not.toBe(undefined);
    expect(auth.keycloak.onAuthError).not.toBe(undefined);
    expect(auth.keycloak.onAuthRefreshError).not.toBe(undefined);

    act(() => {
      auth.keycloak.onAuthSuccess();
    });
    expect(result.current.authenticated).toEqual(true);

    act(() => {
      auth.keycloak.onAuthRefreshError();
    });

    expect(result.current.authenticated).toEqual(false);

    act(() => {
      auth.keycloak.onAuthSuccess();
    });
    expect(result.current.authenticated).toEqual(true);

    act(() => {
      auth.keycloak.onAuthRefreshError();
    });

    expect(result.current.authenticated).toEqual(false);
  });
});
