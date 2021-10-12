const windSpeed = document.querySelector(".wind-value");
const cityTitle = document.querySelector(".city");
const temp = document.querySelector(".temp");
const description = document.querySelector(".weather-descripton")
const humidity = document.querySelector(".humidity-value");
const pressure = document.querySelector(".pressure-value");

const weatherApiConfig = {
    apiKey: "c0fec93c79e38fa329d29aa7ddf6849a",
    fetchWeather: function(city = "Minsk") {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then(response => response.json())
            .then(data => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const currentWeather = {
            cityName: data.name,
            description: data.weather[0].main,
            temp: Math.round(data.main.temp),
            windSpeed: Math.round(data.wind.speed),
            humidity: data.main.humidity,
            pressure: data.main.pressure
        }

        cityTitle.innerHTML = currentWeather.cityName;
        windSpeed.innerHTML = currentWeather.windSpeed + " km/h";
        temp.innerHTML = currentWeather.temp + "°";
        description.innerHTML = currentWeather.description;
        humidity.innerHTML = currentWeather.humidity + " %";
        pressure.innerHTML = currentWeather.pressure + " mb"
    }
}

weatherApiConfig.fetchWeather()
