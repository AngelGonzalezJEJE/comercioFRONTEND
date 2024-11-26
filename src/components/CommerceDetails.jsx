import React from 'react';

const ComercioDetails = ({ selectedComercio, onDelete }) => {
  if (!selectedComercio) return null;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete comercio with CIF: ${selectedComercio.cif}?`);
    if (confirmDelete) {
      onDelete(selectedComercio.cif); // Call the onDelete function passed as a prop
    }
  };

  return (
    <div>
      <h3>Detalles del Comercio</h3>
      <p>Nombre: {selectedComercio.nombre}</p>
      <p>Dirección: {selectedComercio.direccion}</p>
      <p>CIF: {selectedComercio.cif}</p>
      {/* Adjust displayed properties based on your schema */}
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete Comercio
      </button>
    </div>
  );
};

export default ComercioDetails;