import "../Scss/index.scss";
import SWList from "./StarWarsList";
import TarjetaDetalle from "./InfoCard";
import BreadCrumbs from "./BreadCrumbs";
import Landing from "./Landing";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const [character, setCharacter] = useState(null);

  return (
    <Router>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div>
        <div className="text-center">
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
              alt="star-wars-logo"
            />
          </Link>
        </div>
        <BreadCrumbs />
        <Routes>
          <Route path="/" element={<Landing />} exact />
          <Route
            path="/personajes"
            element={<SWList type="personajes" setId={setCharacter} />}
          />
          <Route
            path="/planetas"
            element={<SWList type="planetas" setId={setCharacter} />}
          />
          <Route
            path="/naves"
            element={<SWList type="naves" setId={setCharacter} />}
          />
          <Route
            path="/personajes/:nombre"
            element={<TarjetaDetalle type="personajes" setId={setCharacter} />}
          />
          <Route
            path="/planetas/:nombre"
            element={<TarjetaDetalle type="planetas" setId={setCharacter} />}
          />
          <Route
            path="/naves/:nombre"
            element={<TarjetaDetalle type="naves" setId={setCharacter} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
