const { convertTime, convertToWeekDay } = require('./date');

describe('Convert time function', () => {
  test('should return time in hh:mm format', () => {
    expect(convertTime('2021-10-20 16:00')).toBe('16:00');
  });

  test('should return time in hh:mm format', () => {
    expect(convertTime('2021-10-22 09:00')).toBe('09:00');
  });

  test('should not return falsy value', () => {
    expect(convertTime('2021-10-20 16:00')).not.toBeFalsy();
  });

  test('should return empty string', () => {
    expect(convertTime(null)).toBe('');
    expect(convertTime(undefined)).toBe('');
  });
});

describe('Convert to week day function', () => {
  test('should return correct value', () => {
    expect(convertToWeekDay('2021-10-20')).toBe('Wednesday');
  });

  test('should return correct value', () => {
    expect(convertToWeekDay('2021-10-21')).toBe('Thursday');
  });

  test('should return correct value', () => {
    expect(convertToWeekDay('2021-10-20')).not.toBe('Thursday');
  });

  test('should return empty string', () => {
    expect(convertToWeekDay(undefined)).toBe('');
    expect(convertToWeekDay('')).toBe('');
  });
});
