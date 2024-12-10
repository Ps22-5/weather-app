import React from "react";
import { removeFavorite } from "../api";
import { BiMinusCircle } from "react-icons/bi";

function TopButtons({ setQuery, favorites, fetchFavorites }) {
  const cities = favorites;

  const handleRemoveFavorite = async (id) => {
    await removeFavorite(id);
    fetchFavorites();
  };

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <>
          <button
            key={city.id}
            className="text-lg font-medium hover:bg-gray-700/20 px-3 rounded-md transition ease-in"
            onClick={() => setQuery({ q: city.name })}
          >
            {city.name}
          </button>
          <BiMinusCircle
            title="Remove from Favorites"
            onClick={() => handleRemoveFavorite(city.id)}
            size={18}
            className="cursor-pointer transition ease-out hover:scale-125"
            data-tip="Remove from Favorites"
            style={{
              color: "black",
              marginRight: "10px",
            }}
          />
        </>
      ))}
    </div>
  );
}

export default TopButtons;
