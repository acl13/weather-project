const fetchWeatherData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a01dd8f2b7b0fd48756b05d7cb1e2fe5`;

  fetch(url, {
    method: "GET",
    dataType: "json",
  })
    .then((data) => data.json())
    .then((data) => displayCurrentWeather(data));
};

fetchWeatherData("Charlotte");

const displayCurrentWeather = (data) => {
  console.log(data);
  const fahrenheitTemp = convertKelvinToFahrenheit(data.list[0].main.temp);
  const iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

  document.getElementById("current-temp").textContent =
    `${fahrenheitTemp}\u00B0`;
  document.getElementById("city").textContent = data.city.name;
  document.getElementById("current-condition").textContent =
    data.list[0].weather[0].main;
  document.getElementById("current-icon").src = iconURL;
};

const displayForecast = (data) => {};

const convertKelvinToFahrenheit = (deg) => {
  return Math.round((deg - 273) * 1.8 + 32);
};
