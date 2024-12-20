import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AdminContext = createContext();

// Hook for easy access
export const useAdmin = () => useContext(AdminContext);

// Helper function to handle fetch requests and errors
const handleFetchRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const message = await response.text(); // Get error message from the response
      alert(`Error: ${message || 'Failed to perform the action'}`); // Show alert with error message
      throw new Error(message || 'Failed to perform the action'); // Throw error to be caught by the calling function
    }

    return await response.json();
  } catch (err) {
    alert(`Error: ${err.message || 'An unexpected error occurred'}`); // Show alert for catch block errors
    throw err; // Rethrow the error so it can be handled in the calling function
  }
};

// Provider Component
export const AdminProvider = ({ children }) => {
  const [comercios, setComercios] = useState([]);
  const [cif, setCif] = useState('');
  const [selectedComercio, setSelectedComercio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comLog, setComLog] = useState('');
  const [comToken, setComToken] = useState(null);

  // Fetch comercios on component mount
  useEffect(() => {
    const fetchComercios = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await handleFetchRequest('http://localhost:3000/api/comercio');
        setComercios(data);
      } catch (err) {
        setError(err.message);
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
    try {
      const data = await handleFetchRequest(`http://localhost:3000/api/comercio/${cif}`);
      setSelectedComercio(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a comercio by CIF
  const handleUpdateComercio = async (cif, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedComercio = await handleFetchRequest(
        `http://localhost:3000/api/comercio/${cif}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      // Update the state with the updated comercio
      setComercios(prevComercios =>
        prevComercios.map(comercio =>
          comercio.cif === cif ? updatedComercio : comercio
        )
      );

      setSelectedComercio(updatedComercio);
    } catch (err) {
      setError(err.message || 'An error occurred during update.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new comercio
  const handleCreateComercio = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await handleFetchRequest(
        'http://localhost:3000/api/comercio',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      setComLog('New Universe created!');
      setComToken(responseData.token);
      console.log(responseData.nuevoComercio.cif)
      
      setCif(responseData.cif)
    } catch (err) {
      setComLog(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };
  

  // Delete a comercio by CIF
  const handleDeleteComercio = async (deleteCif) => {
    setLoading(true);
    setError(null);
    try {
      await handleFetchRequest(
        `http://localhost:3000/api/comercio/${deleteCif}?physical=true`,
        {
          method: 'DELETE',
        }
      );
      
      setComercios(comercios.filter((comercio) => comercio.cif !== deleteCif));
      setSelectedComercio(null);
    } catch (err) {
      setError(err.message || 'Failed to delete comercio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        comercios,
        cif,
        comToken,
        setCif,
        selectedComercio,
        loading,
        error,
        setComercios,
        fetchComercioByCif,
        handleCreateComercio,
        handleUpdateComercio,
        handleDeleteComercio,
        setSelectedComercio,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
