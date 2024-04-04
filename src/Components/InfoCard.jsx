import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { imgURLs, getId } from "./StarWarsList";
import { selectData } from "../redux/starWarsState";
import { Link } from "react-router-dom";

const TarjetaDetalle = ({ type, setId }) => {
  const dispatch = useDispatch();

  // Obtener los datos seleccionados del estado global
  const selectedData = useSelector((state) => state.starWars.selectedData);
  // Obtener los detalles de los residentes del estado global
  const residentsDetails = useSelector((state) => state.starWars.residents);

  // Si no hay datos seleccionados, no renderizar nada
  if (!selectedData) {
    return null;
  }

  // Desestructurar los datos seleccionados
  const {
    name,
    image,
    birth_year,
    height,
    gender,
    mass,
    residents,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    terrain,
    surface_water,
    population,
  } = selectedData;

  // Función para actualizar la información seleccionada
  function setInfo(item) {
    // Crear un nuevo objeto con la imagen del personaje
    const newItem = {
      ...item,
      image: `${imgURLs["personajes"]}${getId(item.url)}.jpg`,
    };

    // Actualizar la información seleccionada en el estado global
    dispatch(selectData(newItem));
    // Actualizar el ID del personaje seleccionado
    setId(newItem);
  }

  return (
    <div className="">
      {/* Contenedor principal de la tarjeta de detalle */}
      <div className="container-tarjeta">
        {/* Sección de la imagen */}
        <div className="tarjeta-image">
          <img className="personaje-image" src={image} alt={name} />
        </div>
        {/* Sección de información */}
        <div className="info-text">
          {/* Datos generales */}
          <h1>{name}</h1>
          <span>
            <strong>Nombre: </strong>
            {name}
          </span>
          <span>
            <strong>Año de nacimiento: </strong>
            {birth_year}
          </span>
          <span>
            <strong>Altura: </strong>
            {height} in.
          </span>
          <span>
            <strong>Género: </strong>
            {gender}
          </span>
          <span>
            <strong>Peso: </strong>
            {mass} lbs.
          </span>

          {/* Propiedades específicas de planetas */}
          {diameter && (
            <span>
              <strong>Diametro: </strong>
              {diameter}
            </span>
          )}
          {climate && (
            <span>
              <strong>Clima: </strong>
              {climate}
            </span>
          )}
          {terrain && (
            <span>
              <strong>Tipo de terreno: </strong>
              {terrain}
            </span>
          )}
          {surface_water && (
            <span>
              <strong>Agua en la superficie: </strong>
              {surface_water}
            </span>
          )}
          {population && (
            <span>
              <strong>Población: </strong>
              {population}
            </span>
          )}

          {/* Propiedades específicas de naves */}
          {rotation_period && (
            <span>
              <strong>Periodo de rotación: </strong>
              {rotation_period}
            </span>
          )}
          {orbital_period && (
            <span>
              <strong>Periodo Orbital: </strong>
              {orbital_period}
            </span>
          )}
        </div>
      </div>

      {/* Sección de residentes para planetas */}
      <div>
        {/* Verificar si es un planeta y hay detalles de residentes */}
        {type === "planetas" &&
          residentsDetails &&
          residentsDetails.length > 0 && (
            <div className="container-residentes">
              {/* Título de la sección de residentes */}
              <span className="titlo-residentes">Residentes:</span>
              {/* Lista de residentes */}
              <div className="flex">
                {residentsDetails.map((resident) => (
                  <div key={resident.name} className="resident">
                    {/* Enlace al detalle del personaje */}
                    <Link
                      to={`/personajes/${resident.name}`}
                      onClick={() => setInfo(resident)}
                    >
                      {/* Imagen del personaje */}
                      <img
                        className="img-sm"
                        src={`${imgURLs.personajes}${getId(resident.url)}.jpg`}
                        alt={resident.name}
                      />
                    </Link>
                    {/* Nombre del personaje */}
                    <p className="text-residentes">{resident.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default TarjetaDetalle;
