import { stringToDate, dateToString } from './dateUtil';

describe('stringToDate', () => {
  it('should make no conversion when date is not in the correct format `dd/MM/yyyy` ', () => {
    expect(stringToDate()).toBe(undefined);
    expect(stringToDate(null)).toBe(null);
    expect(stringToDate('')).toBe('');
    expect(stringToDate('12-12-2012')).toBe(null);
  });

  it('should return the date in iso format', () => {
    expect(stringToDate('12/02/13')).toEqual(new Date('2013-02-12'));
  });
});

describe('dateToString', () => {
  it('should convert the date object in the dd/MM/yy format', () => {
    expect(dateToString(stringToDate('12/02/15'))).toEqual('12/02/15');
  });
});
