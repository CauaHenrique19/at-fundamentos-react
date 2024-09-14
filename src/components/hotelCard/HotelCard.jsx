import React from "react";
import { Link } from "react-router-dom";

import "./HotelCard.css";

const HotelCard = ({
  hotel,
  showFavoriteButton,
  isFavorited,
  handleFavorite,
}) => {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      {showFavoriteButton && (
        <button
          className="button-favorite-hotel"
          onClick={() => handleFavorite(hotel)}
        >
          {isFavorited(hotel) ? (
            <i className="bi bi-heart-fill"></i>
          ) : (
            <i className="bi bi-heart"></i>
          )}
        </button>
      )}
      <div className="hotel-card-info">
        <h2>{hotel.name}</h2>
        <p className="hotel-stars">
          {"★".repeat(hotel.stars)}
          {"☆".repeat(5 - hotel.stars)}
        </p>
        <p>
          {hotel.city}, {hotel.state}
        </p>
        <p className="hotel-price">R${hotel.price}/noite</p>
        <Link to={`/hotels/${hotel.id}`} className="button-details-hotel">
          Ver mais detalhes
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
