//Date and time function

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let todayDate = date.getDate();

  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${todayDate} ${month} </br> ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let now = new Date();
let dateTimeElement = document.querySelector(".dateTime");
dateTimeElement.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//display forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let weatherCondition = forecastDay.weather[0].main;
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="weather-forecast-date"><strong>${formatDay(
          forecastDay.dt
        )}</strong></div>
       <div><img class="first-image" src="${iconMap[weatherCondition]}"></div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"><strong>
             ${Math.round(forecastDay.temp.max)}° </strong> /
          </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°C</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6d9d93b7d32e34850e611e89547fc660";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Search function

function showWeather(response) {
  let currentCity = document.querySelector("#currentCity");
  let currentTemperature = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let weatherDescription = document.querySelector("#description");
  let currentTimeDate = document.querySelector(".dateTime");
  let mainIcon = document.querySelector(`#actualWeatherImg`);
  let weatherCondition = response.data.weather[0].main;

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)} C°`;
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Wind:${Math.round(response.data.wind.speed)}Km/h`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  currentTimeDate.innerHTML = formatDate(response.data.dt * 1000);
  mainIcon.src = `${iconMap[weatherCondition]}`;
  console.log(weatherCondition);

  getForecast(response.data.coord);
}

//Image map

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#cityInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity},&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Get current Location

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
}

navigator.geolocation.getCurrentPosition(showLocation);

//convert fahrenheit to celcius

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = `${Math.round(fahrenheitTemperature)} °F`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)} °C`;
}

//Global variables

let apiKey = "6d9d93b7d32e34850e611e89547fc660";
let celsiusTemperature = null;
let city = "Barcelona";
let iconMap = {
  Rain: "src/Images/rain.jpg",
  Drizzle: "src/Images/rain.jpg",
  Thunderstorm: "src/Images/thunderstorm.jpg",
  Snow: "src/Images/snow.jpg",
  Clear: "src/Images/mist.jpg",
  Cloudy: "src/Images/brokenclouds.jpg",
  Mist: "src/Images/scatteredclouds.jpg",
  Haze: "src/Images/fewclouds.jpg",
};

// Button event listeners

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchCity);
