// TODO: Add my own apiKey
const apiKey = "d102ce6f8a7f8c61a416505fdeb98697";
const cityApi = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
};

const myForm = document.getElementById("form");
const citySearchBar = document.getElementById("search");
const result = document.getElementById("result");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = citySearchBar.value;
  getWeather(city);
});

function getWeather(city) {
  const url = cityApi(city);
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();

  xhttp.onload = () => {
    if (xhttp.status != 200) {
      alert(`Error ${xhttp.status}: ${xhttp.statusText}`);
    } else {
      addWeatherToPage(JSON.parse(xhttp.responseText));
    }
  };

  xhttp.onerror = () => {
    alert("Request failed");
  };
}

function addWeatherToPage(data) {
  const resultImg = document.createElement("img");
  const resultTemp = document.createElement("h1");
  const resultCity = document.createElement("h2");
  const resultClimate = document.createElement("h3");

  resultImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  resultTemp.innerText = data.main.temp;
  resultCity.innerText = data.name;
  resultClimate.innerText = data.weather[0].main;

  result.innerHTML = "";
  result.append(resultImg, resultTemp, resultCity, resultClimate);
}
