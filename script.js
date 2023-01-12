


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
    console.log(data)

    console.log(data.list[0].main.feels_like)
  })

})