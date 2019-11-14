import getDate from './getDate';

describe('getDate', () => {
  it('should make no conversion when date is not in the correct format `dd/MM/yyyy` ', () => {
    expect(getDate()).toBe(undefined);
    expect(getDate(null)).toBe(null);
    expect(getDate('')).toBe('');
    expect(getDate('12-12-2012')).toBe(null);
  });

  it('should return the date in iso format', () => {
    expect(getDate('12/02/2012')).toBe('+202012-02-11T23:00:00.000Z');
  });
});
