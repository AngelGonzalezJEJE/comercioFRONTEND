import React from 'react';

const ComerciosList = ({ comercios, filterCif, onSelectComercio }) => {
  const filteredComercios = filterCif
    ? comercios.filter(comercio => comercio.cif.includes(filterCif))
    : comercios;

  return (
    <section>
      <h2>Lista de Comercios</h2>
      <ul>
        {filteredComercios.map((comercio) => (
          <li 
            key={comercio._id} 
            onClick={() => onSelectComercio(comercio)} // Call the click handler with the selected comercio
            style={{ cursor: 'pointer', color: 'blue' }} // Optional styling to indicate clickable items
          >
            {comercio.nombre}
          </li>
        ))}
      </ul>
      {filteredComercios.length === 0 && <p>No comercios found.</p>}
    </section>
  );
};

export default ComerciosList;
