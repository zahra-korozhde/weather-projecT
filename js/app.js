const BASE_URL =
    "https://api.openweathermap.org/data/2.5/";

const API_KEY = "90ac90db30ba348d6468d8042cfbad9d";


const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon =document.getElementById("location");


const getCurrentWeatherByName = async city => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric `
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const getCurrentWeatherByCoordinates = async (lat , lon) => {
    const url = `${BASE_URL}/weather?lat=${lat }&lon=${lon}&appid=${API_KEY}&units=metric `
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const renderCurrentWeather = (data) => {
    console.log(data);
    const weatherJSx= `
    <h1>${data.name} , ${data.sys.country}</h1>
    <div id="main">
    <img  alt="weather icon" src="http://openweathermap.org/img/w/
    ${data.weather[0].icon}.png" />

    <span>${data.weather[0].main}</span>
    <p>${Math.round(data.main.temp) + "°C"}</p>
    </div> 
    <div id="info"> 
    <p> Humidity: <span>${data.main.humidity}</span></p>
    <p> Wind Speed: <span>${data.wind.speed}</span></p>

    </div>
    `;
    weatherContainer.innerHTML = weatherJSx;
};

const searchHandler = async () => {
    const cityName = searchInput.value;

    if(!cityName){
        alert("please enter name of city :) ")
    }
   const currentData = await getCurrentWeatherByName(cityName);
   renderCurrentWeather(currentData);
};

const positionCallback =  async (position) => {
    const {latitude , longitude} = position.coords;
    const currentData = await getCurrentWeatherByCoordinates(latitude , longitude);
    renderCurrentWeather(currentData);

};

const errorCallback = error => {
    console.log(error);
}

const locatonHandler = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallback , errorCallback )
    }else{
        alert("your browser does not support geolocatin")
    }
};


searchButton.addEventListener("click" , searchHandler);
locationIcon.addEventListener("click" , locatonHandler);