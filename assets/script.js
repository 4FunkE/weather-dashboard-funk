//variables to link js to html
const API_KEY = "8eea77c5d98f1a676f012632c1fa37ad";
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

// event listener for search button
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);//created a search function
        cityInput.value = "";//clear the input value
    }
    console.log("clicked search for city!")
});

//fetch to get weather from API
function getWeather(city) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`;
    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);//to show the current weather
            addSearchHistory(city);//to show the search history of cities
        })
        .catch(error => {
            console.log("Error:", error);
        });

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`;
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);//shows the full forcast
        })
        .catch(error => {
            console.log("Error:", error);
        });
}

//The API call shows the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
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

//The API call shows a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function displayForecast(data) {
    const forecastItems = data.list.slice(0, 5).map(item => {
        const date = item.dt_txt.split(" ")[0];
        const weather = item.weather[0].description;
        const temperature = item.main.temp;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;
        const iconCode = item.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;

        return `
            <div class="forecast-item">
                <p>Date: ${date}</p>
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <img src="${iconURL}" alt="Weather Icon">
            </div>
        `;
    });

    forecast.innerHTML = forecastItems.join("");
}

//adding search history
function addSearchHistory(city) {
    const searchItem = document.createElement("div");
    searchItem.classList.add("search-item");
    searchItem.textContent = city;
    searchItem.addEventListener("click", function () {//so that you can click the search history
        getWeather(city);//then be presented with current and future conditions for that city
    });

    searchHistory.appendChild(searchItem);
}

//to get the current date for each call
function getCurrentDate() {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
}