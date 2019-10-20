import { renderHook, act } from '@testing-library/react-hooks';
import useKeycloak from './useKeycloak';
import auth from '../auth/auth';

describe('useKeycloak', () => {
  it('should return an object of positions with booleans when a component hit the viewport edge', () => {
    const { result } = renderHook(() => useKeycloak());
    const authenticated = result.current;
    expect(authenticated).toEqual(false);
    expect(auth.keycloak.onAuthSuccess).not.toBe(undefined);
    expect(auth.keycloak.onAuthError).not.toBe(undefined);
    expect(auth.keycloak.onAuthRefreshError).not.toBe(undefined);

    act(() => {
      auth.keycloak.onAuthSuccess();
    });
    expect(result.current).toEqual(true);

    act(() => {
      auth.keycloak.onAuthRefreshError();
    });

    expect(result.current).toEqual(false);

    act(() => {
      auth.keycloak.onAuthSuccess();
    });
    expect(result.current).toEqual(true);

    act(() => {
      auth.keycloak.onAuthRefreshError();
    });

    expect(result.current).toEqual(false);
  });
});
