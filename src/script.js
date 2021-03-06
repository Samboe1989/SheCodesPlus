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

  return `${day}, ${todayDate} ${month} </br> 🕒${hours}:${minutes}`;
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
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <div class= "borderImg">
       <div><img class="first-image" src="${
         iconMap[weatherCondition]
       }" width="70px"> </div>
       </div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">🌡️<strong>
             ${Math.round(forecastDay.temp.max)}<small>°</small></strong></span>
          <span class="weather-forecast-temperature-min">/${Math.round(
            forecastDay.temp.min
          )}<small>°</small>C</span> <br/>💧${Math.round(forecastDay.humidity)}%
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
  let nightIcon = response.data.weather[0].icon;
  let backGroundImg = document.querySelector(".backGround");
  let message = document.querySelector("#message");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = `<strong>${response.data.name}</strong>, ${response.data.sys.country}`;
  currentTemperature.innerHTML = `<small>🌡️</small><strong>${Math.round(
    response.data.main.temp
  )}</strong><small>°C</small>`;
  humidity.innerHTML = `<strong>Humidity</strong>:💧${response.data.main.humidity}%`;
  windSpeed.innerHTML = `<strong>Wind:</strong>🍃${Math.round(
    response.data.wind.speed
  )}Km/h`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  currentTimeDate.innerHTML = formatDate(response.data.dt * 1000);
  mainIcon.src = `${iconMap[weatherCondition]}`;
  console.log(response);

  if (
    nightIcon === "01n" ||
    nightIcon === "02n" ||
    nightIcon === "03n" ||
    nightIcon === "04n" ||
    nightIcon === "09n" ||
    nightIcon === "10n" ||
    nightIcon === "11n" ||
    nightIcon === "13n" ||
    nightIcon === "50n"
  ) {
    document.querySelector(".backGround").style.backgroundImage =
      "url('images/nightbackground.jpg')";
    backGroundImg.classList.add("nightLight");
    message.innerHTML = "Have a good night! 🌙";
  } else {
    document.querySelector(".backGround").style.backgroundImage =
      "url('images/daybackground.jpg')";
    backGroundImg.classList.remove("nightlight");
    backGroundImg.classList.add("daylight");
    message.innerHTML = "Have a nice day! 😊";
  }

  getForecast(response.data.coord);
}

//Image map

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
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
  navigator.geolocation.getCurrentPosition(showLocation);
}

//convert fahrenheit to celcius

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = `<small>🌡️</small> <strong>${Math.round(
    fahrenheitTemperature
  )}</strong>°F`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = `<small>🌡️</small> <strong>${Math.round(
    celsiusTemperature
  )}</strong>°C`;
}

//Global variables

let apiKey = "6d9d93b7d32e34850e611e89547fc660";
let celsiusTemperature = null;
let city = "Barcelona";
let iconMap = {
  Rain: "Images/rain.png",
  Drizzle: "Images/lightrain.png",
  Thunderstorm: "Images/thunder.png",
  Snow: "Images/snow.png",
  Clear: "Images/clearsky.png",
  Clouds: "Images/cloudy.png",
  Mist: "Images/mist.png",
  Haze: "Images/mist.png",
};

// Button event listeners

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#currentLocationButton");
currentButton.addEventListener("click", getLocation);

search("Barcelona");
