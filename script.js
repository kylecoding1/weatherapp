const apiKey = "69b0df3ffea34ae495ba7d2b00430bcc";

// List of cities for autocomplete
const cities = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA"
];

// Get DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentWeatherDiv = document.getElementById("current-weather");
const forecastDiv = document.getElementById("forecast");

// Initialize Awesomplete with the list of cities
new Awesomplete(cityInput, {
  list: cities
});

// Add click event listener to the search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  fetchCurrentWeather(city);
  fetchForecast(city);
});

// Fetch current weather data for the specified city
function fetchCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayCurrentWeather(data));
}

// Fetch 5-day forecast data for the specified city
function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayForecast(data));
}
// Display current weather data in the DOM
function displayCurrentWeather(data) {
    const { name, main, weather, wind } = data;
    const date = new Date().toLocaleDateString();
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
  
    currentWeatherDiv.innerHTML = `
      <h2>${name} (${date})</h2>
      <img src="${icon}" alt="${weather[0].description}">
      <p>Temperature: ${main.temp}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    `;
  }
  
  // Display 5-day forecast data in the DOM
  function displayForecast(data) {
    // Filter the data to only include forecasts at 12:00 PM
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    let forecastHTML = "";
  
    // Generate HTML for each day in the forecast
    dailyData.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString();
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
  
      forecastHTML += `
        <div class="forecast-day">
          <h3>${date}</h3>
          <img src="${icon}" alt="${day.weather[0].description}">
          <p>Temperature: ${day.main.temp}°C</p>
          <p>Humidity: ${day.main.humidity}%</p>
          <p>Wind Speed: ${day.wind.speed} m/s</p>
        </div>
      `;
    });
  
    // Update the DOM with the generated forecast HTML
    forecastDiv.innerHTML = forecastHTML;
  }
  
  