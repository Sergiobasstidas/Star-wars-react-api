import React from "react";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="paginator">
      <button className="previous-link" onClick={handlePreviousPage}>
        Anterior
      </button>
      <span className="">
        Página {currentPage} de {totalPages}
      </span>
      <button className="next-link" onClick={handleNextPage}>
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;
