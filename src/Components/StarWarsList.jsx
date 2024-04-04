import axios from "axios";
import PropTypes from "prop-types";
import Paginator from "./Paginator";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { selectData, selectResidents } from "../redux/starWarsState";

const SWList = ({ type, setId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener y cargar los datos desde la API
  useEffect(() => {
    // Reinicia los estados relacionados con los datos y la carga
    dispatch(selectData(null));
    dispatch(selectResidents([]));
    setIsLoading(true);

    // Determina el tipo de recurso a buscar en la API (personajes, planetas, naves)
    const endpoint =
      type === "personajes"
        ? "people"
        : type === "planetas"
        ? "planets"
        : "starships";

    // Realiza la solicitud a la API con el tipo y la página actual
    axios
      .get(`https://swapi.dev/api/${endpoint}/?page=${currentPage}`)
      .then((response) => {
        setData(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  }, [currentPage, type]);

  // Función para establecer la información seleccionada y cargar los detalles de residentes (si es un planeta)
  function setInfo(item) {
    // Agrega la URL de la imagen al objeto y actualiza el estado global
    item.image = `${imgURLs[type]}${getId(item.url)}.jpg`;
    dispatch(selectData(item));
    setId(item);

    // Si es un planeta y tiene residentes, busca y carga los detalles de los residentes
    if (type === "planetas" && item.residents && item.residents.length > 0) {
      Promise.all(item.residents.map((residentURL) => axios.get(residentURL)))
        .then((responses) => {
          const residentsDetails = responses.map((response) => response.data);

          dispatch(selectResidents(residentsDetails));
        })
        .catch((error) => {
          console.error("Error al obtener detalles de residentes:", error);
        });
    }
  }

  return (
    <div>
      {/* Muestra un mensaje de carga mientras se obtienen los datos */}
      {isLoading ? (
        <p className="paginator">Cargando datos...</p>
      ) : (
        <div>
          {/* Renderiza el paginador para navegar entre las páginas */}
          <Paginator
            currentPage={currentPage}
            totalPages={Math.ceil(87 / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
          {/* Renderiza la lista de elementos obtenidos */}
          <ul className="flex">
            {data.map((item) => (
              <li className="img-wrapper" key={item.name}>
                {/* Enlace a la vista de detalles del elemento */}
                <Link
                  to={`/${type}/${item.name}`}
                  onClick={() => setInfo(item)}
                >
                  {/* Imagen del elemento */}
                  <img
                    className="img"
                    src={`${imgURLs[type]}${getId(item.url)}.jpg`}
                    alt={item.name}
                  />
                  {/* Detalles adicionales del elemento */}
                  <div
                    className="hover"
                    style={{ color: "var(--golden-starwars)" }}
                  >
                    <h3 className="gold-text">{item.name}</h3>
                    {type === "planetas" && (
                      <>
                        <p className="gold-text">Diametro: {item.diameter}</p>
                        <p className="gold-text">
                          Tipo de terreno: {item.terrain}
                        </p>
                        <p className="gold-text">
                          Tipo de Clima: {item.climate}
                        </p>
                      </>
                    )}
                    {type === "personajes" && (
                      <div className="text">{item.name}</div>
                    )}
                    {type === "naves" && (
                      <>
                        <p className="gold-text">Modelo: {item.model}</p>
                        <p className="gold-text">
                          Capacidad: {item.passengers}
                        </p>
                        <p className="gold-text">
                          Capacidad: {item.cargo_capacity}
                        </p>
                        <p className="gold-text">
                          Starship Class: {item.starship_class}
                        </p>
                      </>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Define los tipos de propiedades esperadas
SWList.propTypes = {
  type: PropTypes.oneOf(["personajes", "planetas", "naves"]).isRequired,
  setId: PropTypes.func.isRequired,
};

// URLs base para las imágenes de los elementos
const imgURLs = {
  personajes: "https://starwars-visualguide.com/assets/img/characters/",
  planetas: "https://starwars-visualguide.com/assets/img/planets/",
  naves: "https://starwars-visualguide.com/assets/img/starships/",
};

// Función para obtener el ID del recurso a partir de su URL
function getId(url) {
  if (typeof url === "string") {
    return url.split("/")[url.split("/").length - 2];
  } else if (typeof url === "object" && url.hasOwnProperty("name")) {
    return url.name;
  } else {
    return "";
  }
}

export { imgURLs, getId };

export default SWList;
