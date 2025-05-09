import './style.css'

// window.addEventListener('onLoad',getDefaultLocation());
function getDefaultLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}
function success(position:GeolocationPosition) {
  getWeatherInfo(position.coords.latitude, position.coords.longitude)
}
        
function error() {
  alert("Sorry, no position available.");
}


async function getWeatherInfo(location:string, api_key:string){
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metrics&appid=${api_key}`
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const temp = json.main.temp;
        const city = json.name ;
        alert(`It is ${temp} cewlcius in ${city}`)
    }catch (error:unknown) {
      console.error("an error occured");
    }
}
