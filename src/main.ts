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


async function getWeatherInfo(lat:number,lon:number){
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ff5b29f4f9c8a46d01ef96c66b2425dd`
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
      console.error(error.message);
    }
}

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
