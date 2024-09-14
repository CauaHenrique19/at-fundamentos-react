import React, { useEffect, useState } from "react";

import Menu from "../../components/menu/Menu";
import HotelCard from "../../components/hotelCard/HotelCard";

import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favorites);
  }, []);

  return (
    <div className="container">
      <Menu />
      <div className="favorites-hotel-list">
        <h2>Hóteis Favoritados</h2>
        <div className="favorite-hotels">
          {favorites.length ? (
            favorites.map(hotel => (
              <HotelCard
                showFavoriteButton={false}
                key={hotel.id}
                hotel={hotel}
              />
            ))
          ) : (
            <div className="not-found-container">
              <i className="bi bi-exclamation-diamond"></i>
              <h1>Nenhum Resultado Encontrado</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
