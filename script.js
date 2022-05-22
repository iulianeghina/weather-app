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

function searchWeather(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  let city = document.querySelector("#city");
  city.innerHTML = `${enterCity.value}`;
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchWeather);

function showCelsiusTemperature() {
  let degrees = document.querySelector("#degrees");
  let degreesFahrenheit = Math.round(degrees.innerHTML * 1.8 + 32);
  degrees.innerHTML = `${degreesFahrenheit}`;
}

function showFahrenheitTemperature() {
  let degrees = document.querySelector("#degrees");
  let degreesCelsius = Math.round((5 / 9) * (degrees.innerHTML - 32));
  degrees.innerHTML = `${degreesCelsius}`;
}

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", showCelsiusTemperature);
let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", showFahrenheitTemperature);

function retriveCity(event) {
  event.preventDefault();
  let enterACity = document.querySelector("#enter-city");
  let weatherInCity = `${enterACity.value}`;

  function showWeatherInSearchedCity(response) {
    console.log(response.data);
    let temperature = document.querySelector("#degrees");
    let roundTemperature = Math.round(response.data.main.temp);
    temperature.innerHTML = roundTemperature;
    let weatherCondition = document.querySelector("#condition");
    weatherCondition.innerHTML = response.data.weather[0].main;
    let emoji = document.querySelector("#emoji");
    if (weatherCondition.innerHTML === "Clouds") {
      emoji.innerHTML = "☁";
    } else if (weatherCondition.innerHTML === "Rain") {
      emoji.innerHTML = "🌧";
    } else if (weatherCondition.innerHTML === "Snow") {
      emoji.innerHTML = "❄";
    } else {
      emoji.innerHTML = "☀";
    }
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
  let apiKey = "e0627f6356ddf3111af3ae2f46c9bf52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInSearchedCity);
}
let searchYourCity = document.querySelector("#search-city");
searchYourCity.addEventListener("submit", retriveCity);

function showCurrentLocationTemperature(temperature) {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    function showCurrentTemperature(response) {
      let temperatureCurrentPosition = document.querySelector("#degrees");
      let roundTemperatureCurrentPosition = Math.round(response.data.main.temp);
      temperatureCurrentPosition.innerHTML = roundTemperatureCurrentPosition;
      let weatherConditionCurrentPosition =
        document.querySelector("#condition");
      weatherConditionCurrentPosition.innerHTML = response.data.weather[0].main;
      let emoji = document.querySelector("#emoji");
      if (weatherConditionCurrentPosition.innerHTML === "Clouds") {
        emoji.innerHTML = "☁";
      } else if (weatherConditionCurrentPosition.innerHTML === "Rain") {
        emoji.innerHTML = "🌧";
      } else if (weatherConditionCurrentPosition.innerHTML === "Snow") {
        emoji.innerHTML = "❄";
      } else {
        emoji.innerHTML = "☀";
      }
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
      let myCity = response.data.name;
      let cityCurrentPosition = document.querySelector("#city");
      cityCurrentPosition.innerHTML = myCity;
    }

    let apiKey = "e0627f6356ddf3111af3ae2f46c9bf52";
    let apiUrlCurrentPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlCurrentPosition).then(showCurrentTemperature);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemperature);
