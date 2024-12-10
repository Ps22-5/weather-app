const API_URL = "http://localhost:3001/favorites";

export const getFavorites = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addFavorite = async (city) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: city }),
  });
  return response.json();
};

export const removeFavorite = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
