import mainReducer, { actionsCreator } from './';

describe('mainReducer', () => {
  it('should create the reducer', () => {
    const state = {
      location: {},
    };
    const action = jest.fn();
    const reducer = mainReducer(state, action);
    expect(Object.entries(reducer).length).toBeGreaterThan(0);
  });
});

describe('actionsCreator', () => {
  it('should throw an error when no reducer is found', () => {
    const reducerName = 'unknown-reducer';
    expect(() => actionsCreator(jest.fn(), reducerName)).toThrowError();
  });

  it('should return the actions for the location reducer', () => {
    const reducerName = 'location';
    const actions = actionsCreator(jest.fn(), reducerName);
    expect(actions).toBeTruthy();
  });
});
