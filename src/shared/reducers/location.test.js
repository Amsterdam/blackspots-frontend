import locationReducer, { actions, initialState } from './location';

describe('locationReducer', () => {
  it('returns the initial state', () => {
    expect(locationReducer(undefined, {})).toEqual(initialState);
  });

  it('should SELECT_LOCATION', () => {
    const payload = { lat: 1, lon: 0 };

    expect(
      locationReducer(initialState, {
        type: actions.selectLocation,
        payload,
      })
    ).toEqual({ selectedLocation: { ...payload } });
  });
});
