import React, { useState, useEffect } from 'react';
import ComerciosList from './CommerceList';
import ComercioSearch from './CommerceSearch';
import ComercioDetails from './CommerceDetails';
import UpdateCommerce from './CommerceUpdate';

const ComerciosDashboard = () => {
  const [comercios, setComercios] = useState([]);
  const [cif, setCif] = useState('');
  const [selectedComercio, setSelectedComercio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all comercios when the component mounts
  useEffect(() => {
    const fetchComercios = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:3000/api/comercio', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch comercios');
        
        const data = await response.json();
        setComercios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComercios();
  }, []);

  // Fetch a single comercio by CIF
  const fetchComercioByCif = async () => {
    setLoading(true);
    setError(null);
    setSelectedComercio(null);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/comercio/${cif}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Comercio not found');
      
      const data = await response.json();
      setSelectedComercio(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete comercio by CIF
  const handleDeleteComercio = async (cif) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/comercio/${cif}?physical=true`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to delete comercio');

      // Remove the deleted comercio from the list
      setComercios(comercios.filter((comercio) => comercio.cif !== cif));
      setSelectedComercio(null); // Clear selected comercio after deletion
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComercioByCif();
  };

  // Set selected comercio when an item is clicked in ComerciosList
  const handleSelectComercio = (comercio) => {
    setSelectedComercio(comercio);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Comercios Dashboard</h1>
      <UpdateCommerce selectedComercio={selectedComercio}/>
      <ComerciosList
        comercios={comercios} 
        filterCif={cif} 
        onSelectComercio={handleSelectComercio} // Pass the handler to set selected comercio
      />
      <ComercioSearch cif={cif} setCif={setCif} handleSearch={handleSearch} />
      <ComercioDetails 
        selectedComercio={selectedComercio} 
        onDelete={handleDeleteComercio} // Pass the delete handler to ComercioDetails
      />
    </div>
  );
};

export default ComerciosDashboard;
