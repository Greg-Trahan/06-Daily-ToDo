


let cityName = "Atlanta"
//Retrieve latitute and longitute data
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e0d2f5b5ff5c2d0b45050097a2089131`)
.then(function (response){
  return response.json()
})

//Retrieve weather data
.then(function(data){
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=e0d2f5b5ff5c2d0b45050097a2089131`)
  .then (response => response.json())
  .then(function(data){
    
    start()

    function start(){
      listCities()
      weatherData = retrieveWeather()
      displayWeather(weatherData)
    }

    function retrieveWeather(){
      let i = 0
      let weatherData = []
      while (i < 40){
        let day = {}
        day.temp = ((data.list[i].main.temp)-273.15)
        day.humidity = data.list[i].main.humidity
        day.wind = data.list[i].wind.speed
        day.clouds = data.list[i].clouds.all
        weatherData.push(day)
        i += 8
      }
      console.log(weatherData)
      return weatherData
    }

    function displayWeather(weatherData){
      let city = data.city.name
      console.log(weatherData)
      const weatherDisplay = $('.weather-display')
      weatherDisplay.children('#current-forecast').append(`<h3>${city}</h3>`)
      weatherDisplay.children('#current-forecast').append(`<p>Temperature: ${weatherData[0].temp} Celcius</p>`)
      weatherDisplay.children('#current-forecast').append(`<p>Humidity: ${weatherData[0].humidity}%</p>`)
      weatherDisplay.children('#current-forecast').append(`<p>Wind: ${weatherData[0].wind} MPH</p>`)

      for (day in weatherData){
        weatherDisplay.children('.five-day').children(`#${day}`).append(`<p>Temperature: ${weatherData[day].temp} Celcius</p>`)
        weatherDisplay.children('.five-day').children(`#${day}`).append(`<p>Humidity: ${weatherData[day].humidity}%</p>`)
        weatherDisplay.children('.five-day').children(`#${day}`).append(`<p>Wind: ${weatherData[day].wind} MPH</p>`)
      }
    }

// $('.container-lg').append(`<div id="${item.hour}" class="row time-block"></div>`)

    function listCities(){

    }





  })
})


