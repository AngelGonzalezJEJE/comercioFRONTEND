import React from 'react';

const ComercioSearch = ({ cif, setCif, handleSearch }) => (
  <section>
    <h2>Buscar Comercio por CIF</h2>
    <form onSubmit={handleSearch}>
      <label>
        CIF:
        <input 
          type="text" 
          value={cif} 
          onChange={(e) => setCif(e.target.value)} 
        />
      </label>
      <button type="submit">Buscar</button>
    </form>
  </section>
);

export default ComercioSearch;
