const windSpeed = document.querySelector(".wind-value");
const cityTitle = document.querySelector(".city");
const temp = document.querySelector(".temp");
const description = document.querySelector(".weather-descripton")
const humidity = document.querySelector(".humidity-value");
const pressure = document.querySelector(".pressure-value");
const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector(".search-bar");
const sunrise = document.querySelector(".sunrise-time-value");
const sunset = document.querySelector(".sunset-time-value");

const weather = {
    apiKey: "9baa190c5b0f4f81825171901211210",
    fetchWeather: function(city = "Minsk", daysCount = 3) {
        fetch("https://api.weatherapi.com/v1/forecast.json?key=" + this.apiKey + "&q=" + city + "&days=" + daysCount + "&aqi=no&alerts=no")
            .then(response => response.json())
            .then(data => this.displayWeather(data));
    },
    displayWeather: function(data) {
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
        }

        sunrise.innerHTML = currentWeather.sunrise;
        sunset.innerHTML = currentWeather.sunset;
        cityTitle.innerHTML = currentWeather.cityName;
        windSpeed.innerHTML = currentWeather.windSpeed + " km/h";
        temp.innerHTML = currentWeather.temp + "°";
        description.innerHTML = currentWeather.description;
        humidity.innerHTML = currentWeather.humidity + " %";
        pressure.innerHTML = currentWeather.pressure + " mb"; 
        document.querySelector(".icon").src = currentWeather.iconSrc;
    },
    search: function () {
        this.fetchWeather(searchBar.value);
        searchBar.value = "";
    }
}

weather.fetchWeather();

searchButton.addEventListener("click", function () {
    weather.search();
})

searchBar.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})