const apiKey = "3e04a6868539b1799be524e346d1b7c9";
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

  xhttp.onprogress = () => {
    result.innerHTML = "";
    result.innerHTML = "<h1> Loading... </h1>";
  };

  xhttp.onload = () => {
    if (xhttp.status != 200) {
      result.innerHTML = "";
      result.innerHTML = ` <h1>Error ${xhttp.status}: ${xhttp.statusText}</h1>`;
    } else {
      addWeatherToPage(JSON.parse(xhttp.responseText));
    }
  };

  xhttp.onerror = () => {
    alert("Request failed");
  };
}

function addWeatherToPage(data) {
  result.innerHTML = "";

  const resultImg = document.createElement("img");
  const resultInfo = document.createElement("div");
  const resultTemp = document.createElement("h1");
  const resultCity = document.createElement("h2");
  const resultClimate = document.createElement("h3");

  resultImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  resultTemp.innerText = data.main.temp;
  resultCity.innerText = data.name;
  resultClimate.innerText = data.weather[0].main;

  resultInfo.append(resultTemp, resultCity, resultClimate);
  result.append(resultImg, resultInfo);
}
