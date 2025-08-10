import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [query, setQuery] = useState({ q: localStorage.getItem("lastQuery") || "" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  const saveFavorites = (favs) => {
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorites(favs);
  };

  const addFavorite = (city) => {
    if (!favorites.some((fav) => fav.name === city.name)) {
      const updated = [...favorites, city];
      saveFavorites(updated);
    }
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    saveFavorites(updated);
  };

  const getWeather = async () => {

    const formatCityName = (name) => {
  return name
    ? name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    : name;
};
    const message = query.q ? formatCityName(query.q)  : "current location";
    toast.info(`Fetching weather data for ${message}`);

    const data = await getFormattedWeatherData({ ...query, units });
    toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
    setWeather(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons
        setQuery={setQuery}
        favorites={favorites}
        removeFavorite={removeFavorite}
      />
      <Inputs
        setQuery={setQuery}
        setUnits={setUnits}
        addFavorite={addFavorite}
      />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
