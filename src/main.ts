import './style.css'
// const api_key = import.meta.env.VITE_API_KEY; 
const api_key = 'ff5b29f4f9c8a46d01ef96c66b2425dd'; 
const now = new Date();
const date = now.getDate();
const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);

//HTML ELEMENTS
const location = (document.getElementById('location')as HTMLHeadingElement); 
const currentDate = (document.getElementById('currentDate')as HTMLParagraphElement); 
const currentTemp = (document.getElementById('temp')as HTMLHeadingElement); 
const weatherDetail = (document.getElementById('weatherDetail')as HTMLSpanElement); 
const tempFeel = (document.getElementById('feels_like')as HTMLSpanElement); 
const humidity = (document.getElementById('humidity')as HTMLSpanElement); 
const windSpeed = (document.getElementById('wspeed')as HTMLSpanElement); 
const pressure = (document.getElementById('pressure')as HTMLSpanElement); 
const weatherIcon = document.getElementById('weatherIcon')as HTMLImageElement;
const body = document.body;
const search = document.querySelector('button') as HTMLButtonElement;

window.onload = ()=> getDefaultWeather();
function getDefaultWeather(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}
function success(position:GeolocationPosition) {
  getLocationName(position.coords.latitude, position.coords.longitude)
}   
function error() {
  alert("Sorry, no position available.");
}

async function getLocationName(lat: number, lon:number){
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${api_key}`;
  try{
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const cityName = json[0].name;
    // getWeatherInfo(cityName);

    //right now for my current location it returns Madhyapur Thimi Municipality which when passed through getWeatherInfo returns 'city not found' 
    //so i have only sent thimi to that function. if using from another location just pass the cityName
    getWeatherInfo(cityName.split(' ')[1]);
    

  }catch (error:unknown) {
    console.error("an error occured");
  }
}

async function getWeatherInfo(cityName:string){
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
       
        //main logic for updating DOM
        location.innerHTML = json.name;
        currentDate.innerHTML = `${weekday}, ${date} ${month}`
        currentTemp.innerHTML = `${json.main.temp}°C`;
        weatherDetail.innerHTML = json.weather[0].main;
        tempFeel.innerHTML = `Feels like: ${json.main.feels_like}°C`;
        humidity.innerHTML = `${json.main.humidity}%`;
        windSpeed.innerHTML = `${json.wind.speed} m/s`
        pressure.innerHTML = `${json.main.pressure} hPa`;
        changeIcon(json); 
    }catch (error:unknown) {
      console.error("an error occured");
    }
}

function getWeather(){
  const cityName:string = (document.getElementById('cityName')as HTMLInputElement).value; 
  getWeatherInfo(cityName);
}

search.onclick = ()=>getWeather();

function changeIcon(json: { weather: { main: string; }[]; }){
  const weatherCondition:string = json.weather[0].main ;
  body.classList.remove("bg-gradient-to-br", "from-sky-200", "via-sky-500", "to-blue-400");
  
  switch(weatherCondition){
    case 'Clear':
      weatherIcon.src = "/clear.png";
      body.classList.add("bg-gradient-to-br", "from-sky-200", "via-sky-500", "to-blue-400");
      break;
    case 'Clouds':
      weatherIcon.src = "/clouds.png";
      body.classList.add("bg-gradient-to-br", "from-sky-800", "via-sky-900", "to-gray-800");
      break;
    case 'Snow':
      weatherIcon.src = "/snow.png";
      body.classList.add("bg-gradient-to-br", "from-gray-200", "via-gray-400", "to-gray-600");
      break;
    case 'Rain':
      weatherIcon.src = "/rain.png";
      body.classList.add("bg-gradient-to-br", "from-gray-400", "via-gray-600", "to-gray-800");
      break;
    case 'Drizzle':
      weatherIcon.src = "/drizzle.png";
      body.classList.add("bg-gradient-to-br", "from-gray-300", "via-gray-500", "to-gray-700");
      break;
    case 'Thunderstorm':
      weatherIcon.src = "/thunderstorm.png";
      body.classList.add("bg-gradient-to-br", "from-gray-600", "via-gray-800", "to-gray-900");
      break;
    default:
      weatherIcon.src = "/haze.png";
      body.classList.add("bg-gradient-to-br", "from-gray-600", "via-gray-800", "to-gray-900");
      break;
  }
}