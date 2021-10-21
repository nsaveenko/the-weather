import citiesListFomJson from '../data/cities.json';

const searchCities = (value) => {
  if (!value) {
    return [];
  }

  const result = citiesListFomJson.data.filter((city) => {
    const cityName = city.name.toLowerCase();
    const searchValue = value.toLowerCase();
    const isPartialMatch = cityName.indexOf(searchValue) !== -1;
    return isPartialMatch;
  }).slice(0, 3);

  return result;
};

export default searchCities;
