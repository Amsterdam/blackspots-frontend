import { renderHook, act } from '@testing-library/react-hooks';
import useKeycloak from './useKeycloak';
import { keycloak } from '../auth/auth';

describe('useKeycloak', () => {
  it('should set the authenticated flag depending on the keycloak authorization callback', () => {
    const { result } = renderHook(() => useKeycloak());
    const user = result.current;
    expect(user.authenticated).toEqual(false);
    expect(keycloak.onAuthSuccess).not.toBe(undefined);
    expect(keycloak.onAuthError).not.toBe(undefined);
    expect(keycloak.onAuthRefreshError).not.toBe(undefined);

    act(() => {
      keycloak.onAuthSuccess();
    });
    expect(result.current.authenticated).toEqual(true);

    act(() => {
      keycloak.onAuthRefreshError();
    });

    expect(result.current.authenticated).toEqual(false);

    act(() => {
      keycloak.onAuthSuccess();
    });
    expect(result.current.authenticated).toEqual(true);

    act(() => {
      keycloak.onAuthRefreshError();
    });

    expect(result.current.authenticated).toEqual(false);
  });
});
