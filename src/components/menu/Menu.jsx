import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Theme";
import "./Menu.css";

const Menu = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuIsActive, setMenuIsActive] = useState(false);

  const handleMenu = () => {
    setMenuIsActive(!menuIsActive);
  };

  return (
    <nav className="menu">
      <h1>Hotéis</h1>
      <button onClick={handleMenu} className="menu-toggle">
        <i className="bi bi-list"></i>
      </button>
      <ul className={`menu-list ${menuIsActive ? "active" : ""}`}>
        <li>
          <Link to="/at-fundamentos-react">Lista de Hotéis</Link>
        </li>
        <li>
          <Link to="/at-fundamentos-react/favorites">Favoritos</Link>
        </li>
        <li>
          <Link to="/at-fundamentos-react/admin">Administração</Link>
        </li>
        <li className="theme-toggler" onClick={toggleTheme}>
          {theme === "light-theme" ? (
            <i className="bi bi-moon-stars-fill"></i>
          ) : (
            <i className="bi bi-sun-fill"></i>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
