import React from "react";
import { BiMinusCircle } from "react-icons/bi";

function TopButtons({ setQuery, favorites, removeFavorite }) {
  return (
    <div className="flex items-center justify-around my-6">
      {favorites.map((city) => (
        <React.Fragment key={city.id}>
          <button
            className="text-lg font-medium hover:bg-gray-700/20 px-3 rounded-md transition ease-in"
            onClick={() => setQuery({ q: city.name })}
          >
            {city.name}
          </button>
          <BiMinusCircle
            title="Remove from Favorites"
            onClick={() => removeFavorite(city.id)}
            size={18}
            className="cursor-pointer transition ease-out hover:scale-125"
            style={{
              color: "black",
              marginRight: "10px",
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default TopButtons;
