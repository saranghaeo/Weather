const apikey = "23793f6b5579797469b0796d623e2a17"

var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityouput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')

apik = "23793f6b5579797469b0796d623e2a17"

function convertion(val)
{
    return (val - 273).toFixed(2)
}

btn.addEventListener('click', function()
{
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
  .then(res => res.json())


  .then(data => 
  {
    var nameval = data['name']
    var descrip = data['weather']['0']['description']
    var tempature = data['main']['temp']
    
    city.innerHTML=`<span>${descrip}<span> in <span>${nameval}<span>`
    temp.innerHTML = `<span>${ convertion(tempature)} °C</span>`

  })

  .catch(err => alert('Ooops. Something went wrong.'))
})

function getWeatherData(long,lati) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${apikey}`;
    fetch(url)
        .then((response) => response.json())
        .then((weatherData) => {
            // console.log(weatherData);
            temp.innerText =
                Math.floor(weatherData.main.temp) + "°C";

            city.innerText =
                weatherData.weather[0].main + " in " + weatherData.name;

        });
}

navigator.geolocation.getCurrentPosition(
    (position) => {
        getWeatherData(position.coords.longitude, position.coords.latitude);
    },
    (positionError) => {
        fetch("https://api.ipify.org")
            .then((response) => response.text())
            .then((ip) => {
                fetch(`http://ip-api.com/json/${ip}`)
                    .then((response) => response.json())
                    .then((position) => {
                        getWeatherData(position.lon, position.lat);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
);