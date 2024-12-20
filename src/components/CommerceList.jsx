import React from 'react';
import { useAdmin } from '../context/AdminContext';
import "../CSS/GlitchPrincess.css"; 

const ComerciosList = () => {
  const { comercios, cif, setSelectedComercio } = useAdmin();

  // Filter comercios based on the CIF input
  const filteredComercios = cif
    ? comercios.filter((comercio) => comercio.cif.includes(cif))
    : comercios;

    return (
      <section className="p-4  rounded-lg text-center shadow-md">
        <h2 className="text-2xl font-bold text-glitch glitch-effect mb-4">Commerce List</h2>
        <ul className="space-y-2 mt-6">
          {filteredComercios.map((comercio) => (
            <li
              key={comercio._id}
              onClick={() => setSelectedComercio(comercio)} // Use context handler to select comercio
              className="p-2 bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-lg cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
            >
              {comercio.nombre}
            </li>
          ))}
        </ul>
        {filteredComercios.length === 0 && (
          <p className="text-pink-300 font-semibold">No commerces found.</p>
        )}
      </section>
    );
    ;
};

export default ComerciosList;
