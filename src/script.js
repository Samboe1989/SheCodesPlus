//Date and time function

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let todayDate = date.getDate();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${todayDate} ${month} | ${hours}:${minutes}`;
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
//Search function

function showWeather(response) {
  let currentCity = document.querySelector("#currentCity");
  let currentTemperature = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let description = document.querySelector("#description");
  let currentTimeDate = document.querySelector(".dateTime");
  let iconElement = document.querySelector("#actualWeatherImg");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)} C°`;
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Wind:${Math.round(response.data.wind.speed)}Km/h`;
  description.innerHTML = response.data.weather[0].description;
  currentTimeDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#cityInput").value;
  let apiKey = "6d9d93b7d32e34850e611e89547fc660";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity},&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchCity);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6d9d93b7d32e34850e611e89547fc660";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//current Location

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getLocation);

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

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// Change weather icon
