const apiKey = "UNLW3RFED95M29XANRRGTU3CS";
const form = document.getElementById("weather-form");
const loadingDiv = document.getElementById("loading");
const weatherInfoDiv = document.getElementById("weather-info");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const location = document.getElementById("location").value;
    loadingDiv.style.display = "block"; // Show loading indicator
    const weatherData = await fetchWeather(location);
    const processedData = processWeatherData(weatherData);
    displayWeather(processedData);
    loadingDiv.style.display = "none"; // Hide loading indicator
});

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`);
        const data = await response.json();
        console.log(data); // Log the full data for debugging
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function processWeatherData(data) {
    const { resolvedAddress, days } = data;
    const todayWeather = days[0]; // Get today's weather
    return {
        location: resolvedAddress,
        temperature: todayWeather.temp,
        conditions: todayWeather.conditions,
    };
}

function displayWeather(weather) {
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${weather.location}</h2>
        <p>Temperature: ${weather.temperature}°F</p>
        <p>Conditions: ${weather.conditions}</p>
    `;
}