const API_KEY = "8eea77c5d98f1a676f012632c1fa37ad";
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8eea77c5d98f1a676f012632c1fa37ad
// Useful links:
// - API documentation https://openweathermap.org/api

// event listener for search button
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        cityInput.value = "";
    }
    console.log("clicked search for city!")
});
//fetch to get weather from API
function getWeather(city) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`;
    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);//need what the weather will display
            addSearchHistory(city);
        })
        .catch(error => {
            console.log("Error:", error);
        });

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`;
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);//need what the weather will display
        })
        .catch(error => {
            console.log("Error:", error);
        });
}
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
function displayCurrentWeather(data) {
    const city = data.name;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
//inner html added for each variable in the function
    const html = `
        <h2>Current Weather in ${city}</h2>
        <p>Date: ${getCurrentDate()}</p>
        <p>Weather: ${weather}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <img src="${iconURL}" alt="Weather Icon">
    `;
    //add weather to html
    currentWeather.innerHTML = html;
}

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function getCurrentDate() {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
}