const KEY = `12709518390f44afad7213919221310`;
let loc = `cairo`;
let futureWeather = `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${loc}&days=7`;
let content = document.getElementById("content");
let inputFind = document.getElementById("input-find");
let btnFind = document.getElementById("btn-find");
let errorFind = document.getElementById("error");
let data;
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
async function getData() {
  let api = await fetch(futureWeather);
  if (api.status === 200) {
    let res = await api.json();
    errorFind.style.display = "none";
    display(res);
  } else {
    errorFind.innerText = "Invalid Input";
    errorFind.style.display = "block";
  }
}

function display(res) {
  let box = ``;
  let { forecastday } = res.forecast;
  console.log(forecastday);
  let { last_updated } = res.current;
  let CD = new Date(last_updated);
  box = `
    <div class="title text-center text-sky-900 font-semibold text-xl py-2 rounded-t" id="loc">
    ${res.location.name} , ${res.location.country}
  </div>
<div class="grid grid-cols-2 text-sky-900  rounded-b">
<div class="col-span-1  rounded-bl p-10">
  <div class="date">
    <p>${weekDays[CD.getDay()]}</p>
    <p>${CD.getDate()} ${Months[CD.getMonth()]}</p> 
  </div>
  <div class="temp_c">
  <p class="">${res.current.temp_c}<sup>o</sup>C</p>
  <img src=${res.current.condition.icon} alt="" class="">
  </div>
  <p class="font-semibold text-lg">${res.current.condition.text}</p>
  <div class="wind">
    <p> <img src="imgs/icon-umberella-2x.png" alt=""> 20%</p>
    <p> <img src="imgs/icon-wind-2x.png" alt=""> ${res.current.wind_kph}km/h</p>
    <p> <img src="imgs/icon-compass-2x.png" alt=""> ${res.current.wind_dir}</p>
  </div>
</div>
<div class="col-span-1 p-5" id="nextDays">${nextDays(forecastday)}</div>
</div>
    `;
  content.innerHTML = box;
  checkWeatherCondition(res.current.condition.text);
}

getData();
function nextDays(forecastday) {
  let CD;
  let box = ``;
  let nDays = forecastday.filter(
    (day, index) =>
      index > 0 &&
      (box += `
  <div class="grid grid-cols-4  border border-[rgba(100,100,100,0.1)] rounded-full px-3 mb-2 items-center">
  <p class="col-span-1">${weekDays[new Date(day.date).getDay()]}</p>

<div class="flex justify-start items-center gap-5 col-span-2">
<div>
<p class="text-xl">${day.day.maxtemp_c}<sup>o</sup>C</p>
<p class="text-sky-800">${day.day.mintemp_c}<sup>o</sup>C</p>
</div>
<p class="font-semibold text-lg">${day.day.condition.text}</p>
</div>
    <img src='${day.day.condition.icon}' class="inline col-span-1 "/> 
  </div>
  `)
  );
  return box;
}

function findCountry() {
  btnFind.onclick = (e) => {
    e.preventDefault();
    console.log(inputFind.value);
    futureWeather = `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${inputFind.value}&days=7`;
    getData();
  };
}
findCountry();
console.log(futureWeather);

function checkWeatherCondition(condition) {
  switch (condition) {
    case "Sunny":
      document.body.style.backgroundImage = "url('../imgs/sunny.jpg')";
      break;
    case "Clear":
      document.body.style.backgroundImage = "url('../imgs/clear.jpg')";
      break;
    case "Patchy rain possible":
    case "Moderate rain":
    case "Moderate rain at times":
    case "Light rain":
    case "Light rain shower":
    case "Heavy rain":
      document.body.style.backgroundImage = "url('../imgs/rain.jpg')";
      break;
    case "Overcast":
    case "Mist":
    case "Partly cloudy":
      document.body.style.backgroundImage = "url('../imgs/partialcloud.jpg')";
      break;
    case "Light snow showers":
      document.body.style.backgroundImage = "url('../imgs/snow.jpg')";
      break;
  }
}
