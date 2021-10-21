import navigateTo from './index';
import getIdFromChild from './utils/dom';
import searchCities from './utils/search';
import { API_KEY, API_URL } from './api';

const currentCitiesList = localStorage.getItem(1).split(',');

function createCitiesCards(data, citiesContainer) {
  const card = document.createElement('div');
  card.className = 'cities-card';
  citiesContainer.appendChild(card);
  card.setAttribute('id', data.cityName);

  const addictionalContainer = document.createElement('div');
  addictionalContainer.className = 'addictional-container';
  card.appendChild(addictionalContainer);

  const container = document.createElement('div');
  container.className = 'cities-card-content-container';
  card.appendChild(container);

  const humidity = document.createElement('p');
  humidity.className = 'cities-card-humidity';
  addictionalContainer.appendChild(humidity);

  const wind = document.createElement('p');
  wind.className = 'cities-card-wind';
  addictionalContainer.appendChild(wind);

  humidity.innerHTML = `
  <i>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M352 146.4c-34.4-48.6-67.5-78.5-90.8-96.6-3.1-2.4-7.3-2.4-10.4-.1-23 17.1-56.1 48.4-90.5 96.5-37.3 52-63 108.4-64.2 170.9 0 1.2-.1 2.5-.1 3.7 0 18.4 3.9 35.9 10.9 52.1 4.1 9.3 9.2 18.1 15.2 26.3 28.5 39 77.8 64.8 133.8 64.8 88.4 0 160.1-64.1 160.1-143.2 0-63.7-27-122.2-64-174.4zm-86 264.3h-.5c-9.9 0-12-14.1-2.6-17.1 45.1-14.2 69.6-38.5 86.4-80.8 3.5-8.9 16.7-6.5 16.8 3.1v1.4c-.1 51.6-44.9 93.4-100.1 93.4z">
        </path>
    </svg>
  </i>
  `;

  const humidityValue = document.createElement('span');
  humidityValue.className = 'humidity-value';
  humidity.appendChild(humidityValue);

  wind.innerHTML = `
  <i>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1C10.327 4 11 4.673 11 5.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zM15.5 15H8v2h7.5c.827 0 1.5.673 1.5 1.5S16.327 20 15.5 20c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z">
        </path>
        <path
            d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4S20.206 5 18 5zM2 15H6V17H2z">
        </path>
    </svg>
  </i>
  `;

  const windValue = document.createElement('span');
  windValue.className = 'wind-value';
  wind.appendChild(windValue);

  const citiesContent = document.createElement('div');
  citiesContent.className = 'cities-card-content';
  container.appendChild(citiesContent);

  const temp = document.createElement('h2');
  temp.className = 'cities-card-temp';
  citiesContent.appendChild(temp);

  const city = document.createElement('p');
  city.className = 'cities-card-city';
  citiesContent.appendChild(city);

  const country = document.createElement('p');
  country.className = 'cities-card-country';
  citiesContent.appendChild(country);

  city.innerHTML = data.cityName;
  country.innerHTML = data.countryName;
  temp.innerHTML = `${data.temp}°`;
  windValue.innerHTML = `${Math.round(data.windSpeed)} km/h`;
  humidityValue.innerHTML = `${data.humidity} %`;

  const icon = document.createElement('img');
  icon.alt = 'card icon';
  icon.src = data.iconSrc;
  icon.className = 'cities-card-icon';
  container.appendChild(icon);

  card.addEventListener('click', (event) => {
    const cityFromId = getIdFromChild(event.target);
    navigateTo(`/city/${cityFromId}`);
  });
}

function renderCitiesData() {
  const defaultCitiesList = ['Minsk', 'London', 'Denver', 'Tokyo', 'Los Angeles', 'New York'];

  if (!localStorage.length) {
    localStorage.setItem(1, defaultCitiesList);
  }

  const input = document.querySelector('.search-bar');
  const citiesContainer = document.querySelector('.cities-cards');

  const weather = {
    fetchWeather(city = 'Minsk') {
      fetch(`${API_URL}/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch(() => {
          alert('Something went wrong :( ');
        });
    },
    displayWeather(data) {
      const obj = {
        cityName: data.location.name,
        countryName: data.location.country,
        temp: Math.round(data.current.temp_c),
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        iconSrc: data.current.condition.icon,
      };
      createCitiesCards(obj, citiesContainer);
    },
    displayCitiesList() {
      citiesContainer.innerHTML = '';
      for (let i = 0; i < currentCitiesList.length; i += 1) {
        weather.fetchWeather(currentCitiesList[i]);
      }
    },
  };

  weather.displayCitiesList();

  input.addEventListener('input', () => {
    const resultElement = document.querySelector('.search-result');
    resultElement.classList.add('hidden');
    resultElement.innerHTML = '';
    const result = input.value.length === 0 ? [] : searchCities(input.value);

    if (input.value.length > 0) {
      resultElement.classList.remove('hidden');
    }

    result.forEach((city) => {
      const row = document.createElement('div');
      row.innerHTML = `
        <div id=${city.name}>${city.name}</div>
      `;
      resultElement.appendChild(row);

      row.addEventListener('click', (event) => {
        const cityName = event.target.id;
        currentCitiesList.push(cityName);
        currentCitiesList.shift();
        localStorage.removeItem(1);
        localStorage.setItem(1, currentCitiesList);
        weather.displayCitiesList();
        input.value = '';
        resultElement.classList.add('hidden');

        navigateTo(`/city/${cityName}`);
      });
    });
  });
}

export default renderCitiesData;
