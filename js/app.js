const BASE_URL =
    "https://api.openweathermap.org/data/2.5/";

const API_KEY = "90ac90db30ba348d6468d8042cfbad9d";


const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon =document.getElementById("location");
// const modalButton =document.getElementById("modal-button");

const DAYS= [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
// import { removeModal, showModal } from "./function/modal.js";


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
const getForcastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric `;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};


const renderCurrentWeather = (data) => {
     if (!data) return;
    const weatherJSx= `
    <h1>${data.name} , ${data.sys.country}</h1>
    <div id="main">
    <img  alt="weather icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" />
    
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
  
    const getWeekDay = date => {
        return DAYS[new Date(date *1000).getDay()];
    };

    const renderForecastWeather = (data) =>{
        forecastContainer.innerHTML =" ";
       data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
        data.forEach((i) => { 
            const forecastJsx =` 
            <div>
            <img  alt="weather icon" src="http://openweathermap.org/img/w/${i.weather[0].icon}.png"/>
                   <h3>${getWeekDay(i.dt)}</h3>
                   <p>${Math.round(i.main.temp) + "°C" }  </p>
                   <span>${i.weather[0].main}</span>
            </div>
            `;

            forecastContainer.innerHTML += forecastJsx;
            
        });

    };
    const getForecastWeatherByCoordinates = async (lat,lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `
        const response = await fetch(url);
        const json = await response.json();
        return json;
    };

const searchHandler = async () => {
    const cityName = searchInput.value;

    if(!cityName){
    alert("please enter name of city :) ")
    return;
    }

   const currentData = await getCurrentWeatherByName(cityName);
   renderCurrentWeather(currentData);
   const forcastData = await getForcastWeatherByName(cityName);
   renderForecastWeather(forcastData);
};

const positionCallback =  async (position) => {
    const {latitude , longitude} = position.coords;
    const currentData = await getCurrentWeatherByCoordinates(latitude , longitude);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByCoordinates(latitude, longitude);
    renderForecastWeather(forecastData);

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
// modalButton.addEventListener( "click" , removeModal);