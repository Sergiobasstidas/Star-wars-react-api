import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="center-container">
      <div className="img-wrapper">
        <Link to="/personajes">
          <img
            className="img"
            src="https://i.pinimg.com/736x/18/13/bb/1813bb07eb46ad79e1bccbd809a3a49d.jpg"
            alt="Personajes"
          />
          <div className="hover">
            <div className="text text-personajes">PERSONAJES</div>
          </div>
        </Link>
      </div>
      <div className="img-wrapper">
        <Link to="/planetas">
          <img
            className="img "
            src="https://cdn.pixabay.com/photo/2023/01/17/05/33/star-wars-7723785_1280.jpg"
            alt="Planetas"
          />
          <div className="hover">
            <div className="text text-planetas">PLANETAS</div>
          </div>
        </Link>
      </div>
      <div className="img-wrapper">
        <Link to="/naves">
          <img
            className="img"
            src="https://images.alphacoders.com/173/173621.jpg"
            alt="naves"
          />
          <div className="hover">
            <div className="text text-naves">NAVES</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
