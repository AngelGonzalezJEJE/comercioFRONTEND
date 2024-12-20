import React from 'react';
import { useAdmin } from '../context/AdminContext';
import "../CSS/GlitchPrincess.css"; 


const ComercioSearch = () => {
  const { cif, setCif, handleSearch } = useAdmin();

  return (
    <section className="p-4 bg-glitch w-1/4 rounded-lg shadow-md mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <label className="flex items-center space-x-2 text-white">
          <input
            type="text"
            value={cif}
            onChange={(e) => setCif(e.target.value)}
            className="border border-purple-500 rounded px-4 py-2 bg-gray-900 text-pink-300 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter CIF"
          />
        </label>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>
    </section>
  );
  ;
};

export default ComercioSearch;
