import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/slices/weatherSlice";

const WeatherCard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(fetchWeather(location));
    }
  }, [location, dispatch]);

  return (
    <div className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md">
      <h3 className="text-sm text-gray-400 mb-2">Weather</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && data.current_weather && (
        <div>
          <p className="text-lg font-bold">Current Weather</p>
          <p>Temperature: {data.current_weather.temperature}°C</p>
          <p>Wind Speed: {data.current_weather.windspeed} m/s</p>
        </div>
      )}
      {data && data.hourly && (
        <div className="mt-4">
          <p className="text-lg font-bold">Hourly Forecast</p>
          <ul className="space-y-2">
            {data.hourly.time.slice(0, 5).map((time, index) => (
              <li key={index} className="text-gray-400">
                <p>
                  {time}: {data.hourly.temperature_2m[index]}°C, Wind:{" "}
                  {data.hourly.wind_speed_10m[index]} m/s
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
