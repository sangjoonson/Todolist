const weather = document.querySelector(".js-weather");
const API_KEY = "17612170fec604931af14e3ed8e38c09"
const COORDS = 'coords'

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObject){
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude,
        longitude
    };
    saveCoords(coordsObject);
    getWeather(latitude,longitude)
}
function handleGeoError(){
    console.log("cant access");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();