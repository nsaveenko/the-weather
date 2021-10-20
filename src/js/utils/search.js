const citiesListFomJson = require('../data/cities.json');

function searchCities(value) {
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
}

module.exports = { searchCities };
