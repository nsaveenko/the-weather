import City from "./views/City.js"
import Cities from "./views/Cities.js"

const navigationLinks = document.querySelectorAll('.nav-link');

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: '/', view: City },
        { path: '/cities', view: Cities },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            isMatch: location.pathname === route.path,
        };
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        }
    }

    const view = new match.route.view();

    document.querySelector("main").innerHTML = await view.getHtml();

    switch(match.route.path) {
        case '/' : 
            navigationLinks[0].classList.add('active-page');
            navigationLinks[1].classList.remove('active-page');
            const windSpeed = document.querySelector('.wind-value');
            const cityTitle = document.querySelector('.city');
            const temp = document.querySelector('.temp');
            const description = document.querySelector('.weather-descripton');
            const humidity = document.querySelector('.humidity-value');
            const pressure = document.querySelector('.pressure-value');
            const searchButton = document.querySelector('.search-button');
            const searchBar = document.querySelector('.search-bar');
            const sunrise = document.querySelector('.sunrise-time-value');
            const sunset = document.querySelector('.sunset-time-value');
            const dailyCardsList = document.querySelector('.daily-forecast-cards');
            const hourlyCardsList = document.querySelector('.hourly-forecast-cards');
            const currentDate = new Date();
            const currentTime = currentDate.getHours();


            function convertToWeekDay(incorrectDate) {
            const date = new Date(incorrectDate);
            const options = {
                weekday: 'long',
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
            }

            function convertTime(timeValue) {
            return timeValue.substring(11, 16);
            }

            function createHourlyForecastCardsForToday(data) {
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

            function updateCity() {
            dailyCardsList.innerHTML = '';
            hourlyCardsList.innerHTML = '';
            }

            const weather = {
            apiKey: '9baa190c5b0f4f81825171901211210',
            fetchWeather(city = 'Minsk', daysCount = 3) {
                fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=${daysCount}&aqi=no&alerts=no`)
                .then((response) => response.json())
                .then((data) => this.displayWeather(data))
                .catch(() => {
                    alert('Something went wrong :(');
                    this.fetchWeather();
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
                const cardsCount = currentTime + 7;

                for (let i = currentTime; i < cardsCount; i += 1) {
                createHourlyForecastCardsForToday(todayForecast[i]);
                }
                const dailyForecast = data.forecast.forecastday;
                for (let i = 0; i < dailyForecast.length; i += 1) {
                createDailyForecastCards(dailyForecast[i]);
                }
            },
            search() {
                this.fetchWeather(searchBar.value);
                searchBar.value = '';
            },
            };

            weather.fetchWeather();

            searchButton.addEventListener('click', () => {
            updateCity();
            weather.search();
            });

            searchBar.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                updateCity();
                weather.search();
            }
            });
            break;
        case '/cities' : 
            navigationLinks[1].classList.add('active-page');
            navigationLinks[0].classList.remove('active-page');
            console.log('/citiestest');
            break;
    }
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('[data-link]')) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    })

    router();
});