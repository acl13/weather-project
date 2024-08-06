const fetchWeatherData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a01dd8f2b7b0fd48756b05d7cb1e2fe5`;

  fetch(url, {
    method: "GET",
    dataType: "json",
  })
    .then((data) => data.json())
    .then((data) => displayWeatherData(data));
};

fetchWeatherData("Charlotte");

const displayCurrentWeather = (data) => {
  const fahrenheitTemp = convertKelvinToFahrenheit(data.list[0].main.temp);
  const iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

  document.getElementById("current-temp").textContent =
    `${fahrenheitTemp}\u00B0`;
  document.getElementById("city").textContent = data.city.name;
  document.getElementById("current-condition").textContent =
    data.list[0].weather[0].main;
  document.getElementById("current-icon").src = iconURL;
};

const displayForecast = (data) => {
  console.log(data);
  const dayOne = data.list[7];
  const dayTwo = data.list[15];
  const dayThree = data.list[23];
  const dayFour = data.list[31];
  const dayFive = data.list[39];

  document.getElementById("day-one-condition").textContent =
    dayOne.weather[0].main;
  document.getElementById("day-one-temp").textContent =
    `${convertKelvinToFahrenheit(dayOne.main.temp)}\u00B0`;
  document.getElementById("day-one-icon").src =
    `https://openweathermap.org/img/wn/${dayOne.weather[0].icon}@2x.png`;

  document.getElementById("day-two-condition").textContent =
    dayTwo.weather[0].main;
  document.getElementById("day-two-temp").textContent =
    `${convertKelvinToFahrenheit(dayTwo.main.temp)}\u00B0`;
  document.getElementById("day-two-icon").src =
    `https://openweathermap.org/img/wn/${dayTwo.weather[0].icon}@2x.png`;

  document.getElementById("day-three-condition").textContent =
    dayThree.weather[0].main;
  document.getElementById("day-three-temp").textContent =
    `${convertKelvinToFahrenheit(dayThree.main.temp)}\u00B0`;
  document.getElementById("day-three-icon").src =
    `https://openweathermap.org/img/wn/${dayThree.weather[0].icon}@2x.png`;

  document.getElementById("day-four-condition").textContent =
    dayFour.weather[0].main;
  document.getElementById("day-four-temp").textContent =
    `${convertKelvinToFahrenheit(dayFour.main.temp)}\u00B0`;
  document.getElementById("day-four-icon").src =
    `https://openweathermap.org/img/wn/${dayFour.weather[0].icon}@2x.png`;

  document.getElementById("day-five-condition").textContent =
    dayFive.weather[0].main;
  document.getElementById("day-five-temp").textContent =
    `${convertKelvinToFahrenheit(dayFive.main.temp)}\u00B0`;
  document.getElementById("day-five-icon").src =
    `https://openweathermap.org/img/wn/${dayFive.weather[0].icon}@2x.png`;
};

const displayWeatherData = (data) => {
  displayCurrentWeather(data);
  displayForecast(data);
};

const convertKelvinToFahrenheit = (deg) => {
  return Math.round((deg - 273) * 1.8 + 32);
};
