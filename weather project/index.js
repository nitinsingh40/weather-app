const apiKey= `4fdf30e5f0dee8dfa2f49be0dedee306`;
async function fetchWeatherData(city){
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
    
        if(!response.ok){
            throw new Error('unable to fetch weather data');
        }
        const data = await response.json();
        console.log(data);
    
        updateWeeatherUI(data);
    }
    catch(error){
        console.error(error);
    }
    
}

const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.weatherTemp');
const windSpeed = document.querySelector('.wind-level');
const humidity = document.querySelector('.humidity-level');
const visibility = document.querySelector('.visibility-level');
const descriptionText = document.querySelector('.weatherTitle');
const date = document.querySelector('.date');
const descriptionIcon = document.querySelector('.weatherCondition i');


function updateWeeatherUI(data){
      cityElement.textContent = data.name;
      tempElement.textContent = `${Math.round(data.main.temp)}°`;
      windSpeed.textContent = `${data.wind.speed}km/h`;
      humidity.textContent = `${data.main.humidity}%`;
      visibility.textContent = `${data.visibility/1000} km`;
      descriptionText.textContent = data.weather[0].description;

      const currentDate = new Date();
      const weatherIconName = getWeatherIconName(data.weather[0].main);
      descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`
      date.textContent = currentDate.toDateString();
}

const formElement = document.querySelector('.search-form');
const inputBox = document.querySelector('.search-city');

formElement.addEventListener('submit', function(e){
    e.preventDefault();

    const city = inputBox.value;

    if(city !==''){
        fetchWeatherData(city);
        inputBox.value = '';
    }
});

function getWeatherIconName(weatherCondition){
     const iconMap = {
        Clear: 'wb_sunny',
        Clouds: 'wb_cloudy',
        Rain: 'umbrella',
        Thunderstorm: 'flash_on',
        Drizzle: 'grain',
        Snow: 'ac_unit',
        Mist: 'cloud',
        Smoke: 'cloud',
        Haze: 'cloud',
        Fog: 'cloud',

     };

     return iconMap[weatherCondition] || 'help';
}