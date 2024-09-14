import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Menu from "../../components/menu/Menu";

import "./HotelDetails.css";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState();

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels"));
    const parsedId = parseInt(id);
    const hotel = storedHotels.find(hotel => hotel.id === parsedId);
    setHotel(hotel);
  }, [id]);

  if (!hotel) return <p>Carregando...</p>;

  return (
    <div className="container">
      <Menu />
      <div className="hotel-details">
        <div className="hotel-images">
          <img
            src={hotel.image}
            alt={`Imagem ${hotel.name}`}
            className="hotel-image"
          />
        </div>
        <div className="hotel-info">
          <div className="hotel-name">
            <h1>{hotel.name}</h1>
            <p className="hotel-description">{hotel.description}</p>
            <p>
              <strong>Cidade:</strong> {hotel.city}
            </p>
            <p>
              <strong>Estado:</strong> {hotel.state}
            </p>
          </div>
          <p>
            <strong>Preço por noite:</strong> R${hotel.price}
          </p>

          <div className="hotel-services">
            <h3>Serviços oferecidos:</h3>
            <ul>
              {hotel.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
