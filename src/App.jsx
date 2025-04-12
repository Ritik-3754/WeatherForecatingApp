import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "f430a735c3118c20f44a37c705af11a2";

  const getWeather = async () => {
    if (!city) return;
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-5">
          🌤️ Weather Forecast
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={getWeather}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Go
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center font-medium mb-3">{error}</p>
        )}

        {weather && (
          <div className="bg-gradient-to-br from-white to-indigo-50 p-4 rounded-xl text-center shadow-inner">
            <h2 className="text-lg font-semibold text-indigo-800 mb-1">
              {weather.name}
            </h2>
            <p className="text-4xl font-bold text-indigo-900 mb-2">
              {weather.main.temp}°C
            </p>
            <p className="capitalize text-indigo-700 mb-2">
              {weather.weather[0].description}
            </p>
            <div className="flex justify-between text-sm text-indigo-800 mt-3 px-2">
              <div>
                <p className="font-semibold">Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="font-semibold">Wind</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
