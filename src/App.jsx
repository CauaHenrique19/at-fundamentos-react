import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeContext } from "./Theme";

import HotelList from "./pages/hotel/HotelList";
import HotelDetails from "./pages/hotelDetails/HotelDetails";
import Admin from "./pages/admin/Admin";
import Favorites from "./pages/favorites/Favorites";

import "./global.css";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <Router>
        <Routes>
          <Route path="/at-fundamentos-react/" element={<HotelList />} />
          <Route
            path="/at-fundamentos-react/hotels/:id"
            element={<HotelDetails />}
          />
          <Route
            path="/at-fundamentos-react/favorites"
            element={<Favorites />}
          />
          <Route path="/at-fundamentos-react/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
