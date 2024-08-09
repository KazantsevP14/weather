import React, { useState } from "react";
import "./App.css";
import { Weather } from "./Weather";

function App() {
  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
  } | null>(null);

  const fetchWeater = () => {
    // const city = "London";
    const APIkey = "1ce2c8f1225f14bf33b893989c1548cf";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setError("City not found");
          setWeather(null);
        } else {
          console.log(json);

          setWeather({
            temp: json.main.temp,
            description: json.weather[0].description,
          });
          setError(null);
        }
      })
      .catch((error) => {
        console.log("Ошибка", error);
        setError("An error occurred");
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
      ></input>
      <button onClick={fetchWeater}>Get weater</button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {weather && (
        <Weather temp={weather?.temp} description={weather?.description} />
      )}
    </div>
  );
}

export default App;
