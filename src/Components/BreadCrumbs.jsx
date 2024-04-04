import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  // Obtener la ubicación actual del enrutador
  const location = useLocation();
  // Dividir la ruta en segmentos y filtrar los vacíos
  const segments = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav>
      <ul>
        <Link className="sin-estilos page-link" to="/">
          Home
        </Link>
        {/* Iterar sobre los segmentos de la ruta */}
        {segments.map((segment, index) => (
          <span key={segment}>
            <span className="sin-estilos page-link"> / </span>
            {/* Verificar si es el último segmento */}
            {index === segments.length - 1 ? (
              <span className="sin-estilos page-link">
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </span>
            ) : (
              // Mostrar enlace para segmentos anteriores
              <Link
                className={`sin-estilos page-link ${
                  // Agregar clase si es el segmento de "planetas" y hay tres segmentos en total
                  segment === "planetas" && segments.length === 3 && index === 1
                    ? "current-segment"
                    : ""
                }`}
                to={`/${segment}`}
              >
                {/* Convertir la primera letra en mayúscula y las demás en minúsculas */}
                {segment.includes("%20")
                  ? segment.replace("%20", " ")
                  : segment.charAt(0).toUpperCase() +
                    segment.slice(1).toLowerCase()}
              </Link>
            )}
          </span>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
