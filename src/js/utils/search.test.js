import searchCities from './search';

describe('Search city function', () => {
  const expectedResult = [{
    country: 'BY',
    name: 'Gomel',
    lat: '52.4345',
    lng: '30.9754',
  }];

  test('should return correct value', () => {
    expect(searchCities('Gomel')[0].name).toBe(expectedResult[0].name);
  });

  test('should return correct length of result array', () => {
    expect(searchCities('Minsk').length).toBe(3);
  });

  test('should return correct length of result array', () => {
    expect(searchCities('jkncdsjknvdn').length).toBe(0);
  });

  test('should return empty array', () => {
    expect(searchCities(null).length).toBe(0);
    expect(searchCities(undefined).length).toBe(0);
  });
});
