import { useEffect, useState } from "react";

import Menu from "../../components/menu/Menu";
import HotelCard from "../../components/hotelCard/HotelCard";

import hotelsData from "../../data/hotels.json";
import "./HotelList.css";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels")) || [];

    if (storedHotels.length) {
      setHotels(storedHotels);
      setFilteredHotels(storedHotels);
    } else {
      storedHotels.push(...hotelsData);
      localStorage.setItem("hotels", JSON.stringify(storedHotels));
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favorites);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(term)
    );
    setFilteredHotels(filtered);
  };

  const isFavorited = (hotel) => {
    const favorited = favorites.some((favorite) => favorite.id === hotel.id);
    return favorited;
  };

  const handleFavorite = (hotel) => {
    const favorited = isFavorited(hotel);

    if (favorited) {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== hotel.id
      );

      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return;
    }

    const newFavorites = [...favorites, hotel];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleOrder = (e) => {
    const field = e.target.value;

    if (!field) {
      return;
    }

    const ordered = filteredHotels.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });

    setFilteredHotels([...ordered]);
  };

  return (
    <div className="container">
      <Menu />
      <div className="hotel-list">
        <div className="input-container">
          <div className="input-container-header">
            <h2>Pesquise por hotéis</h2>
            <select onChange={handleOrder}>
              <option value="">Ordenar Por</option>
              <option value="price">Preço</option>
              <option value="stars">Classificação</option>
            </select>
          </div>
          <div className="input-group">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Pesquisar pelo nome do hotel..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />
          </div>
        </div>
        <div className="hotels">
          {filteredHotels.length ? (
            filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                showFavoriteButton={true}
                handleFavorite={handleFavorite}
                isFavorited={isFavorited}
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

export default HotelList;
