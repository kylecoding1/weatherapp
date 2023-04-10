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