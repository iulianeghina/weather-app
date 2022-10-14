function showWeatherForecast(coordinates) {
  let apiKey = "faa261b304bfc269bca49770138629cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(commingDaysForecast);
  axios.get(apiUrl).then(curretDayForecast);
}

function showCurrentDateAndTime(response) {
  let currentDate = new Date();
  let timezone = response.data.timezone;

  localTime = currentDate.getTime();
  localOffset = currentDate.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let cityDateCode = utc + 1000 * timezone;
  let cityDate = new Date(cityDateCode);

  let date = cityDate.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = cityDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = cityDate.getFullYear();

  let hour = cityDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = cityDate.getMinutes();
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
  currentDayAndTime.innerHTML = `${days[cityDate.getDay()]} ${hour}:${minutes}`;

  let actualDate = document.querySelector("#actual-date");
  actualDate.innerHTML = `${date}/${month}/${year}`;
}

function showWeatherInSearchedCity(response) {
  let cityName = response.data.name;
  document.querySelector("#city").innerHTML = cityName;
  if (cityName.length > 15) {
    document.querySelector("#city").style.fontSize = "18px";
  } else if (cityName.length >= 8 && cityName.length < 15) {
    document.querySelector("#city").style.fontSize = "38px";
  }
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
  showWeatherForecast(response.data.coord);
}

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let apiKey = "faa261b304bfc269bca49770138629cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInSearchedCity);
  axios.get(apiUrl).then(showCurrentDateAndTime);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchWeather);

function curretDayForecast(response) {
  let forecast = response.data.daily;
  let dayInterval = document.querySelector("#day-interval");
  let dayForecastHTML = `<div class="row">`;
  dayForecastHTML =
    dayForecastHTML +
    `
       <div class="col-sm-3 col-6 day-interval">
        <div class="morning">Morning</div>
        <div class = "interval-temperature"> 🌡 </div>
        <div class="over-the-day-temperature">${Math.round(
          forecast[0].temp.morn
        )}°</div>
        </div>`;
  dayForecastHTML =
    dayForecastHTML +
    `
       <div class="col-sm-3 col-6 day-interval">
        <div class="midday">Midday</div>
        <div class = "interval-temperature"> 🌡 </div>
        <div class="over-the-day-temperature">${Math.round(
          forecast[0].temp.day
        )}°</div>
        </div>`;
  dayForecastHTML =
    dayForecastHTML +
    `
       <div class="col-sm-3 col-6 day-interval">
        <div class="evening">Evening</div>
        <div class = "interval-temperature"> 🌡 </div>
        <div class="over-the-day-temperature">${Math.round(
          forecast[0].temp.eve
        )}°</div>
        </div>`;
  dayForecastHTML =
    dayForecastHTML +
    `
       <div class="col-sm-3 col-6 day-interval">
        <div class="night">Night</div>
        <div class = "interval-temperature"> 🌡 </div>
        <div class="over-the-day-temperature">${Math.round(
          forecast[0].temp.night
        )}°</div>
        </div>`;
  dayInterval.innerHTML = dayForecastHTML;
  dayForecastHTML = dayForecastHTML + `</div>`;
}

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Thusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function commingDaysForecast(response) {
  let forecast = response.data.daily;
  let nextDayForecast = document.querySelector("#comming-days-forecast");
  let commmingDaysForecastHTML = `<div>`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      commmingDaysForecastHTML =
        commmingDaysForecastHTML +
        `<li><span class = "days-forecast">${formatDayForecast(
          forecastDay.dt
        )}</span>
                    <div class = "forecast-temp"> <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt=${
          forecastDay.weather[0].description
        } width="35px"> <span class = "forecast-max-temp">${Math.round(
          forecastDay.temp.max
        )}°</span> / <span class = "forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
                  </li>`;
    }
  });
  nextDayForecast.innerHTML = commmingDaysForecastHTML;
  commmingDaysForecastHTML = commmingDaysForecastHTML + `</div>`;
}

function showDefaultWeather(city) {
  let apiKey = "faa261b304bfc269bca49770138629cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInSearchedCity);
  axios.get(apiUrl).then(showCurrentDateAndTime);
}

function showCurrentLocationTemperature(event) {
  event.preventDefault();
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "faa261b304bfc269bca49770138629cd";
    let apiUrlCurrentPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlCurrentPosition).then(showWeatherInSearchedCity);
    axios.get(apiUrlCurrentPosition).then(showCurrentDateAndTime);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemperature);

showDefaultWeather("Brussel");
