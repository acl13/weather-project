document.getElementById("search").addEventListener("click", function () {
  const userSearch = document.getElementById("search-query").value;
  console.log(userSearch);

  if (userSearch === "") {
    alert("Please enter the name of a city");
  } else {
    fetchWeatherData(userSearch);
  }

  document.getElementById("search-query").value = "";
});

const fetchWeatherData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a01dd8f2b7b0fd48756b05d7cb1e2fe5`;
  const searchButton = document.getElementById("search");
  searchButton.disabled = true;
  searchButton.innerHTML = `<i class="fa fa-spinner fa-spin"></i>Loading
`;
  fetch(url, {
    method: "GET",
    dataType: "json",
  })
    .then((data) => data.json())
    .then((data) => {
      displayWeatherData(data);
      searchButton.disabled = false;
      searchButton.innerHTML = "Search";
    })
    .catch(handleError);
};

fetchWeatherData("Charlotte");

const displayCurrentWeather = (data) => {
  document.querySelector(".current-weather").replaceChildren();
  const fahrenheitTemp = convertKelvinToFahrenheit(data.list[0].main.temp);
  const iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

  const template = ` 
    <div class="col-md-6 justify-center">
      <h2>${fahrenheitTemp}&deg</h2>
      <h3 id="city">${data.city.name}</h3>
      <h4 id="current-condition">${data.list[0].weather[0].main}</h4>
    </div>
    <div class="col-md-6">
      <img
        src= "${iconURL}"
        />
      </div>`;

  document
    .querySelector(".current-weather")
    .insertAdjacentHTML("beforeend", template);
};

const displayForecast = (data) => {
  document.querySelector(".forecast").replaceChildren();
  const dayOne = data.list[7];
  const dayTwo = data.list[15];
  const dayThree = data.list[23];
  const dayFour = data.list[31];
  const dayFive = data.list[39];
  const forecastDisplay = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  // Weekdays listed twice to account for overlap
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  forecastDisplay.forEach((day) => {
    const index = forecastDisplay.indexOf(day);
    const forecastIconURL = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const forecastTemplate = `
    <div class="col-md-2 justify-center p-5 border" id="${index}">
          <h5 id="day-one-condition">${day.weather[0].main}</h5>
          <h5 id="day-one-temp">${convertKelvinToFahrenheit(day.main.temp)}&deg</h5>
          <img
            id="day-one-icon"
            src="${forecastIconURL}"
          />
          <h6 id="day-one">${days[date.getDay() + (index + 1)]}</h6>
        </div>`;

    document
      .querySelector(".forecast")
      .insertAdjacentHTML("beforeend", forecastTemplate);
  });
  document.getElementById(`${0}`).classList.add("offset-md-1");
};

const displayWeatherData = (data) => {
  displayCurrentWeather(data);
  displayForecast(data);
};

const convertKelvinToFahrenheit = (deg) => {
  return Math.round((deg - 273) * 1.8 + 32);
};

function handleError(error) {
  console.log(`ERROR: ${error}`);
}
