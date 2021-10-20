function loadCityData() {
  const windSpeed = document.querySelector('.wind-value');
  const cityTitle = document.querySelector('.city');
  const temp = document.querySelector('.temp');
  const description = document.querySelector('.weather-descripton');
  const humidity = document.querySelector('.humidity-value');
  const pressure = document.querySelector('.pressure-value');
  const sunrise = document.querySelector('.sunrise-time-value');
  const sunset = document.querySelector('.sunset-time-value');
  const dailyCardsList = document.querySelector('.daily-forecast-cards');
  const hourlyCardsList = document.querySelector('.hourly-forecast-cards');
  const currentDate = new Date();
  const currentTime = currentDate.getHours();

  function convertToWeekDay(incorrectDate) {
    if (!incorrectDate) {
      return '';
    }

    const date = new Date(incorrectDate);
    const options = {
      weekday: 'long',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function convertTime(timeValue) {
    if (!timeValue) {
      return '';
    }
    return timeValue.substring(11, 16);
  }

  function createHourlyForecastCardsForToday(data = {}) {
    const card = document.createElement('div');
    const timeTitle = document.createElement('h4');
    const iconCard = document.createElement('img');
    const tempTitle = document.createElement('p');

    card.className = 'hourly-forecast-card';
    iconCard.className = 'hourly-forecast-cards-icon';
    timeTitle.className = 'hourly-forecast-cards-time';
    tempTitle.className = 'hourly-forecast-cards-temp';

    hourlyCardsList.appendChild(card);
    card.appendChild(timeTitle);
    card.appendChild(iconCard);
    card.appendChild(tempTitle);

    timeTitle.innerHTML = convertTime(data.time);
    iconCard.src = data.condition.icon;
    tempTitle.innerHTML = `${Math.round(data.temp_c)}°`;
  }

  function createDailyForecastCards(data) {
    const card = document.createElement('div');
    const dayOfWeek = document.createElement('p');
    const iconCard = document.createElement('img');
    const tempContainer = document.createElement('div');
    const maxTempTitle = document.createElement('p');
    const minTempTitle = document.createElement('p');

    card.className = 'daily-forecast-card';
    dayOfWeek.className = 'daily-forecast-cards-week';
    iconCard.className = 'daily-forecast-cards-icon';
    tempContainer.className = 'temp-container';
    maxTempTitle.className = 'max-temp';
    minTempTitle.className = 'min-temp';

    dailyCardsList.appendChild(card);
    card.appendChild(dayOfWeek);
    card.appendChild(iconCard);
    card.appendChild(tempContainer);
    tempContainer.appendChild(maxTempTitle);
    tempContainer.appendChild(minTempTitle);

    dayOfWeek.innerHTML = convertToWeekDay(data.date);
    iconCard.src = data.day.condition.icon;
    maxTempTitle.innerHTML = `${Math.round(data.day.maxtemp_c)}°`;
    minTempTitle.innerHTML = `${Math.round(data.day.mintemp_c)}°`;
  }

  const weather = {
    apiKey: '9baa190c5b0f4f81825171901211210',
    fetchWeather(city = 'Minsk', daysCount = 3) {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=${daysCount}&aqi=no&alerts=no`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch(() => {
          console.log('Something went wrong :( ');
        });
    },
    displayWeather(data) {
      const currentWeather = {
        cityName: data.location.name,
        description: data.current.condition.text,
        temp: Math.round(data.current.temp_c),
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        pressure: data.current.pressure_mb,
        iconSrc: data.current.condition.icon,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
      };

      sunrise.innerHTML = currentWeather.sunrise;
      sunset.innerHTML = currentWeather.sunset;
      cityTitle.innerHTML = currentWeather.cityName;
      windSpeed.innerHTML = `${currentWeather.windSpeed} km/h`;
      temp.innerHTML = `${currentWeather.temp}°`;
      description.innerHTML = currentWeather.description;
      humidity.innerHTML = `${currentWeather.humidity} %`;
      pressure.innerHTML = `${currentWeather.pressure} mb`;
      document.querySelector('.icon').src = currentWeather.iconSrc;
      const todayForecast = data.forecast.forecastday[0].hour;

      let cardsCount = 22 + 4;
      let cardsStartValue = currentTime;

      if (cardsCount > 24) {
        cardsCount = 24;
        cardsStartValue = 20;
      }

      for (let i = cardsStartValue; i < cardsCount; i += 1) {
        createHourlyForecastCardsForToday(todayForecast[i]);
      }

      const dailyForecast = data.forecast.forecastday;

      for (let i = 0; i < dailyForecast.length; i += 1) {
        createDailyForecastCards(dailyForecast[i]);
      }
    },
  };
  weather.fetchWeather(window.location.pathname.split(/\//)[2]);
}

export default loadCityData;
