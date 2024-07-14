const YourWeatherbtn = document.querySelector(".yourWeather");
const temperatureStatus = document.querySelector(".tempStatus");
const weatherstatus = document.querySelector(".weatherResult");
const temptext = document.querySelector(".Temp");
const weatherconditionImage = document.querySelector(".weatherCondition");
const notfound = document.querySelector(".notfounddiv");
const searchweathernbtn = document.querySelector(".SearchWeather");
const searchbtn = document.querySelector(".searchbtn");
const cityInput = document.querySelector(".cityInput");
const cityNAme = document.querySelector(".cityName");
const condition = document.querySelector(".condition");
const weatherimg = document.querySelector(".weatherConditionImage");
const tempt = document.querySelector(".Temp");
const wind = document.querySelector(".windtext");
const humidity = document.querySelector(".humiditytext");
const cloud = document.querySelector(".cloudtext");

const apiId = "5aac0747a4a9c46ace2f74c231775671";

const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

function showMyTemp() {
  temperatureStatus.style.display = "flex";
  weatherstatus.style.display = "initial";
  temptext.style.display = "initial";
  weatherconditionImage.style.display = "flex";
}
function searchWeather() {
  temperatureStatus.style.display = "none";
  weatherstatus.style.display = "none";
  temptext.style.display = "none";
  weatherconditionImage.style.display = "none";
}

searchbtn.addEventListener("click", function () {
  showcityweather(cityInput.value);
});

async function showcityweather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiId}`);
  
  if (response.status == 404) {
    notfound.style.display = "initial";
  }
  else {
    var data = await response.json();
    temperatureStatus.style.display = "flex";
    weatherstatus.style.display = "initial";
    temptext.style.display = "initial";
    weatherconditionImage.style.display = "block";
    cityNAme.innerHTML = data.name;
    condition.innerHTML = data.weather[0].main;
    tempt.innerHTML = `${parseInt(data.main.temp)}°C `;
    wind.innerHTML = `${data.wind.speed}m/s`
    humidity.innerHTML = `${data.main.humidity}%`
    cloud.innerHTML = `${data.clouds.all}%`
    if ((data.weather[0].main = "humidity")) {
      weatherimg.src = "Images/cloud.png";
    }
    if ((data.weather[0].main = "wind")) {
      weatherimg.src = "Images/wind.png";
    }
    if ((data.weather[0].main = "humidity")) {
      weatherimg.src = "Images/humidity.png";
    }
  }
}
