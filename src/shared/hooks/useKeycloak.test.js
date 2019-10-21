import { renderHook, act } from '@testing-library/react-hooks';
import useKeycloak from './useKeycloak';
import auth from '../auth/auth';

describe.only('useKeycloak', () => {
  it('should return an object of positions with booleans when a component hit the viewport edge', () => {
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
