import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./Weather.css"
const Weather = () => {
    // State to hold weather data and user's current location
    const [weatherData, setWeatherData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [cityInput, setCityInput] = useState('');
  
    // API URL and API key
    const apiKey = 'API KEY'; // Replace with your actual API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`
   
  
    // Fetch user's current location using geolocation API
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          error => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not available on this device.');
      }
    }, []);
  
    // Fetch weather data for the specified city
    useEffect(() => {
      if (cityInput) {
        axios
        axios.get(weatherApiUrl, { params: { appid: apiKey, lat: currentLocation.lat, lon: currentLocation.lon} })

          .then(response => {
            setWeatherData(response.data);
          })
          .catch(error => {
            console.error('Error fetching weather data for the specified city:', error);
          });
      }
    }, [cityInput]);
  
    // Fetch weather data for the user's current location
    useEffect(() => {
      if (currentLocation) {
        axios
          .get(weatherApiUrl, { params: { appid: apiKey, lat: currentLocation.lat, lon: currentLocation.lon ,units:'metric'  } })
          .then(response => {
            setWeatherData(response.data);
          })
          .catch(error => {
            console.error('Error fetching weather data for current location:', error);
          });
      }
    }, [currentLocation]);
  
    // Handle city input change
    const handleCityChange = event => {
      setCityInput(event.target.value);
    };
  
    // Handle form submission for city input
    const handleCitySubmit = event => {
      event.preventDefault();
      // Fetch weather data for the specified city
      axios
        .get(weatherApiUrl, { params: { appid: apiKey, q: cityInput,units:'metric'  } })
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data for the specified city:', error);
        });
    };
  
    // JSX to display the weather information
    return (
      <div className='place'>
          <h1>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;Weather App</h1>
        <form onSubmit={handleCitySubmit}>
          <input type="text"  value={cityInput} onChange={handleCityChange} />
          <button type="submit">Get Weather</button>
        </form>
        {weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  };
  
  export default Weather;