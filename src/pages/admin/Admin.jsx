import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

import Menu from "../../components/menu/Menu";

import "./Admin.css";

const Admin = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    additionalImage1: "",
    additionalImage2: "",
    additionalImage3: "",
    stars: 1,
    city: "",
    state: "",
    price: "",
    description: "",
    services: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      const additionalImages = [
        formData.additionalImage1,
        formData.additionalImage2,
        formData.additionalImage3,
      ];

      const newHotel = {
        ...formData,
        stars: parseInt(formData.stars),
        price: parseFloat(formData.price),
        services: formData.services.split(",").map((service) => service.trim()),
        additionalImages,
      };

      if (newHotel.id) {
        const indexNewHotel = hotels.findIndex(
          (hotel) => hotel.id === newHotel.id
        );
        hotels[indexNewHotel] = newHotel;
        setHotels(hotels);
        localStorage.setItem("hotels", JSON.stringify(hotels));
      } else {
        const id = new Date().getTime();
        hotels.push({ ...newHotel, id });
        setHotels(hotels);
        localStorage.setItem("hotels", JSON.stringify(hotels));
      }

      setFormData({
        id: "",
        name: "",
        image: "",
        additionalImage1: "",
        additionalImage2: "",
        additionalImage3: "",
        stars: 1,
        city: "",
        state: "",
        price: "",
        description: "",
        services: "",
      });

      const message = newHotel.id
        ? "Hotel Editado com Sucesso!"
        : "Hotel Criado com Sucesso!";
      toast.success(message);
    } catch (error) {
      toast.error("Ocorreu um erro inesperado ao realizar operação!");
    }
  };

  const handleEdit = (hotel) => {
    setFormData({
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      city: hotel.city,
      image: hotel.image,
      additionalImage1: hotel.additionalImages[0],
      additionalImage2: hotel.additionalImages[1],
      additionalImage3: hotel.additionalImages[2],
      price: hotel.price,
      services: hotel.services.join(","),
      stars: hotel.stars,
      state: hotel.state,
    });
  };

  const handleDelete = (hotelToDelete) => {
    try {
      const updatedHotels = hotels.filter(
        (hotel) => hotel.id !== hotelToDelete.id
      );
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
      setHotels(updatedHotels);
      toast.success("Hotel Excluído com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado ao realizar operação!");
    }
  };

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels")) || [];
    setHotels(storedHotels);
  }, []);

  return (
    <>
      <div className="hotel-container">
        <Toaster position="top-right" richColors duration={2000} />
        <Menu />
        <div className="form-container">
          <h1>Administração de Hotéis</h1>
          <form onSubmit={handleSubmit} className="hotel-form">
            <input
              type="hidden"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
            <div className="input-group">
              <label>
                Nome do Hotel:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Imagem (URL):
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Classificação (Estrelas):
                <select
                  name="stars"
                  value={formData.stars}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1 Estrela</option>
                  <option value="2">2 Estrelas</option>
                  <option value="3">3 Estrelas</option>
                  <option value="4">4 Estrelas</option>
                  <option value="5">5 Estrelas</option>
                </select>
              </label>
            </div>
            <div className="input-group">
              <label>
                Imagem Adicional 1 (URL):
                <input
                  type="url"
                  name="additionalImage1"
                  value={formData.additionalImage1}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Imagem Adicional 2 (URL):
                <input
                  type="url"
                  name="additionalImage2"
                  value={formData.additionalImage2}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Imagem Adicional 3 (URL):
                <input
                  type="url"
                  name="additionalImage3"
                  value={formData.additionalImage3}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Cidade:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Estado:
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Preço da Diária (R$):
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Descrição
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Itens e Serviços (separados por vírgula):
                <input
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  required
                  pattern="^([a-zA-ZÀ-ÿ\s-]+)(,[a-zA-ZÀ-ÿ\s-]+)*$"
                />
              </label>
            </div>
            <button type="submit">Salvar</button>
          </form>
          <div className="list-hotels-container">
            <h1>Lista de Hotéis</h1>
            <table className="hotel-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Imagem</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Preço da Diária (R$)</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel, index) => (
                  <tr key={index}>
                    <td>{hotel.name}</td>
                    <td>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="hotel-table-image"
                      />
                    </td>
                    <td>{hotel.city}</td>
                    <td>{hotel.state}</td>
                    <td>{hotel.price}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(hotel)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(hotel)}
                        className="delete-button"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
