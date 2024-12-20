import React from 'react';
import { useAdmin } from '../context/AdminContext';
import "../CSS/GlitchPrincess.css"; 

const ComercioDetails = () => {
  const { selectedComercio, handleDeleteComercio } = useAdmin();

  if (!selectedComercio) {
    return <p className="text-gray-500 text-center mx-auto">No commerce selected.</p>;
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete comercio with CIF: ${selectedComercio.cif}?`
    );
    if (confirmDelete) {
      handleDeleteComercio(selectedComercio.cif); // Call the delete function from context
    }
  };

  return (
    <div className="card-glitch text-center w-1/2 mx-auto">
      <h3 className="text-xl font-bold mb-4">Commerce Details</h3>
      <div className="mb-2 text-center">
        <p><span className="font-semibold">Name:</span> {selectedComercio.nombre}</p>
        <p><span className="font-semibold">Address:</span> {selectedComercio.direccion}</p>
        <p><span className="font-semibold">CIF:</span> {selectedComercio.cif}</p>
      </div>
      <button
        onClick={handleDelete}
        className="button-glitch"
        aria-label={`Delete comercio ${selectedComercio.nombre}`}
      >
        Delete Comercio
      </button>
    </div>
  );
  ;
};

export default ComercioDetails;
