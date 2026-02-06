import React, { useState } from 'react';
import bg from "./assets/sun.jpg";
import './App.css';

const API_KEY = "e9d62d5c8499be51afb6c53dc74d7dd8";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found.");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="page"
    style={{
      backgroundImage: `url(${bg})`,
    }}>
    <div className="app">
      <div className="header">
        <h1>Weather App 🌤️</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      <div className="section">
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather">
            <h2>{weather.name}</h2>
            <p> Temperature: {weather.main.temp} °C</p>
            <p> Weather: {weather.weather[0].description}</p>
            <p> Humidity: {weather.main.humidity}%</p>
            <p> Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>

      <div className="footer">
        <p>© Copyright - Ajitesh</p>
      </div>
    </div>
    </div>
  );
}