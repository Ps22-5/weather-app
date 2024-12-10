import { useState } from "react";
import { BiCurrentLocation, BiHeart, BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { addFavorite } from "../api";

const inputs = ({ setQuery, setUnits, fetchFavorites }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      localStorage.setItem("lastQuery", city);
      setQuery({ q: city });
    }
  };

  const handleAddFavorite = async () => {
    if (city) {
      await addFavorite(city);
      setCity("");
      fetchFavorites();
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <div
          style={{
            marginLeft: "-35px",
            color: "black",
            marginRight: "10px",
          }}
        >
          <AiFillHeart
            title="Add to Favorites"
            onClick={handleAddFavorite}
            size={30}
            className="cursor-pointer transition ease-out hover:text-red-500"
          />
        </div>
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search by city..."
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default inputs;