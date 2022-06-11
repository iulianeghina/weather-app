let currentDate = new Date();
let date = currentDate.getDate();
if (date < 10) {
  date = `0${date}`;
}
let month = currentDate.getUTCMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Thusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Suturday",
];
let currentDayAndTime = document.querySelector("#today-time");
currentDayAndTime.innerHTML = `${
  days[currentDate.getDay()]
} ${hour}:${minutes}`;

let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = `${date}/${month}/${year}`;

function showWeatherInSearchedCity(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperature = document.querySelector("#degrees");
  let roundTemperature = Math.round(celsiusTemperature);
  temperature.innerHTML = roundTemperature;
  let weatherCondition = document.querySelector("#condition");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  let minTemp = document.querySelector("#min");
  let roundedMinTemp = Math.round(response.data.main["temp_min"]);
  minTemp.innerHTML = `min ${roundedMinTemp}°`;
  let maxTemp = document.querySelector("#max");
  let roundedMaxTemp = Math.round(response.data.main["temp_max"]);
  maxTemp.innerHTML = `max ${roundedMaxTemp}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `humidity ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `wind ${roundedWindSpeed}km/h`;
}

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let apiKey = "e0627f6356ddf3111af3ae2f46c9bf52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInSearchedCity);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchWeather);

function curretDayForecast() {
  let dayInterval = document.querySelector("#day-interval");
  let dayForecastHTML = `<div class="row">`;
  let intervals = ["Night", "Morning", "Midday", "Evenig"];
  intervals.forEach(function (interval) {
    dayForecastHTML =
      dayForecastHTML +
      `
       <div class="col-3 day-interval">
        <div class="night">${interval}</div>
        <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="clar-sky-night" width="35px">
        <div class="night-temperature">5°</div>
        </div>`;
  });
  dayInterval.innerHTML = dayForecastHTML;
  dayForecastHTML = dayForecastHTML + `</div>`;
}

function commingDaysForecast() {
  let nextDayForecast = document.querySelector("#comming-days-forecast");
  let commmingDaysForecastHTML = `<div>`;
  let days = ["Tomorrow", "Monday", "Thusday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    commmingDaysForecastHTML =
      commmingDaysForecastHTML +
      `<li class="days">${day}
                    <br />
                    <p> <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="clar-sky-night" width="35px"> 16°</p>
                  </li>`;
  });
  nextDayForecast.innerHTML = commmingDaysForecastHTML;
  commmingDaysForecastHTML = commmingDaysForecastHTML + `</div>`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let degrees = document.querySelector("#degrees");
  let degreesFahrenheit = Math.round(celsiusTemperature * 1.8 + 32);
  degrees.innerHTML = `${degreesFahrenheit}`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", showFahrenheitTemperature);
let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

function showDefaultWeather(city) {
  let apiKey = "e0627f6356ddf3111af3ae2f46c9bf52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInSearchedCity);
}

function showCurrentLocationTemperature(event) {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "e0627f6356ddf3111af3ae2f46c9bf52";
    let apiUrlCurrentPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlCurrentPosition).then(showWeatherInSearchedCity);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemperature);

showDefaultWeather("Brussel");
curretDayForecast();
commingDaysForecast();
