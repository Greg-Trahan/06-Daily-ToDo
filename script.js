const button = $("#submit-button");
let cityName = "Minneapolis";
cityHistory = JSON.parse(localStorage.getItem("cities"));
if (cityHistory === null) {
  cityHistory = [];
}

button.on("click", function (event) {
  event.preventDefault();
  searchCity();
});
// button.on('click', searchCity())

start();

function start() {
  weather();
  listCities();
}

function searchCity() {
  const textBox = $("#search-bar");
  cityName = textBox.val();
  cityHistory.push(cityName);
  console.log(cityHistory);
  weather();
  saveCities();
  listCities();
  textBox.val("");
}

function historySearch(event) {
  cityName = event.target.textContent;
  weather();
}

//List previously searched cities
function listCities() {
  const history = $(".city-history");
  history.children().empty();
  for (var i = 0; i < cityHistory.length; i++) {
    history
      .children()
      .append(
        `<li class = 'li-btn' onclick='historySearch(event)'>${cityHistory[i]}</li>`
      );
  }
}

function saveCities() {
  localStorage.setItem("cities", JSON.stringify(cityHistory));
  // const cityHistory = $(".city-history");
  // cityHistory.append(`<button>${cityName}</button>`);
}

function weather() {
  //Retrieve latitute and longitute data
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e0d2f5b5ff5c2d0b45050097a2089131`
  )
    .then(function (response) {
      return response.json();
    })

    //Retrieve weather data
    .then(function (data) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=e0d2f5b5ff5c2d0b45050097a2089131`
      )
        .then((response) => response.json())
        .then(function (data) {
          startWeather();

          console.log(data);

          function startWeather() {
            weatherData = retrieveWeather();
            displayWeather(weatherData);
          }

          //Grab weather data for the next 5 days
          function retrieveWeather() {
            let i = 0;
            let weatherData = [];
            while (i < 40) {
              let day = {};

              splitTime = data.list[i].dt_txt.split(" ");
              splitDay = splitTime[0].split("-");

              day.date = splitDay[1] + "/" + splitDay[2] + "/" + splitDay[0];
              day.temp = (data.list[i].main.temp - 273.15).toFixed(2);
              day.humidity = data.list[i].main.humidity;
              day.wind = data.list[i].wind.speed;
              day.clouds = data.list[i].clouds.all;
              weatherData.push(day);
              i += 8;
            }

            return weatherData;
          }

          //Display the weather data on the page
          function displayWeather(weatherData) {
            let city = data.city.name;
            console.log(weatherData);
            const currentDisplay = $("#current-forecast").empty();
            const fiveDayDisplay = $(".five-day");
            const forecastDiv = $(".forecast");

            currentDisplay.append(`<h3>${city} (${weatherData[0].date})</h3>`);
            currentDisplay.append(
              `<p>Temperature: ${weatherData[0].temp} Celcius</p>`
            );
            currentDisplay.append(
              `<p>Humidity: ${weatherData[0].humidity}%</p>`
            );
            currentDisplay.append(`<p>Wind: ${weatherData[0].wind} MPH</p>`);

            forecastDiv.empty();
            for (day in weatherData) {
              fiveDayDisplay
                .children(`#${day}`)
                .append(`<h4>${weatherData[day].date}</h4>`);
              fiveDayDisplay
                .children(`#${day}`)
                .append(`<p>Temp: ${weatherData[day].temp} Celcius</p>`);
              fiveDayDisplay
                .children(`#${day}`)
                .append(`<p>Humidity: ${weatherData[day].humidity}%</p>`);
              fiveDayDisplay
                .children(`#${day}`)
                .append(`<p>Wind: ${weatherData[day].wind} MPH</p>`);
            }
          }
        });
    });
}
