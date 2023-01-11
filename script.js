


let cityName = "Athens"

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e0d2f5b5ff5c2d0b45050097a2089131`)

.then(function (response){
  return response.json()
})

.then(function(data){
  console.log(data)
  let lat=data[0].lat
  let lon=data[0].lon

  console.log(data[0].lat)
  console.log(data[0].lon)

  fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e0d2f5b5ff5c2d0b45050097a2089131`)

  // .then (response => response.json())

  // .then(function(data){
  //   console.log(data)
  //   let temp = data[0].temp
  // })

})