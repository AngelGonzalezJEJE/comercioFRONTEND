import React, { useState, useEffect } from 'react';

const PageInfo = () => {
  const [pageData, setPageData] = useState(null); // State to store the page data
  const [error, setError] = useState(null); // State to store any error messages
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Check if the page data is already in localStorage
    const savedPageData = localStorage.getItem("Page");

      // If no data in localStorage, fetch it from API
      const fetchPageInfo = async () => {
        try {
          const cif = localStorage.getItem("cif");
          const comtoken = localStorage.getItem("CommerceToken");

          // Check if necessary items are present in localStorage
          if (!cif || !comtoken) {
            setError("Missing CIF or CommerceToken in localStorage.");
            setLoading(false);
            return;
          }

          const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${comtoken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`); // Handle non-200 responses
          }

          const data = await response.json(); // Parse JSON

          // Save the data to localStorage
          JSON.stringify(localStorage.setItem("Page", data));

          // Set the data in state
          setPageData(data);
        } catch (err) {
          setError(err.message); // Set error message
        } finally {
          setLoading(false); // Set loading to false once fetch is complete
        }
      };

      fetchPageInfo(); // Call the fetch function if no data found in localStorage
    
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Show error message if any
  }

  if (!pageData) {
    return <div className="text-gray-400">No data available</div>; // Handle case where no data is returned
  }

  return (
    <div className="p-6 auth-form max-w-xl mx-auto text-center text-white">
      <h1 className="text-2xl font-bold text text-glitch glitch-effect mb-4">Page Information</h1>

      {/* Page Details */}
      <p className="mb-2">
        <strong>CIF:</strong> {pageData.cif || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Title:</strong> {pageData.titulo || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Activity:</strong> {pageData.actividad || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Summary:</strong> {pageData.resumen || "No summary available."}
      </p>
      <p className="mb-2">
        Scoring: {pageData.reseñas?.scoring || "N/A"}
      </p>

      {/* Image Display */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Images:</h3>
        {pageData.imagenes && pageData.imagenes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageData.imagenes.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Page image ${index + 1}`}
                className="max-w-full border-2 border-pink-300 rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=No+Image"; // Fallback placeholder
                  e.target.className += " opacity-70";
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No images available.</p>
        )}
      </div>

      <div className="card-details p-4 mt-6 mb-6">
        <h3 className="text-glitch text-2xl mb-4 glitch-effect" data-text="Comments">
          Comments:
        </h3>
        {pageData.reseñas?.comentarios && pageData.reseñas.comentarios.length > 0 ? (
          pageData.reseñas.comentarios.map((comment, index) => {
            const rating = pageData.reseñas.ratings.find(
              (rating) => rating.userId.toString() === comment.userId.toString()
            );

            return (
              <div key={index} className="card-details p-4 mb-4">
                <p className="text-white">
                  <strong>{comment.userName}:</strong> {comment.comentario}
                </p>
                <p className="text-white">
                  <strong>Rating: </strong> {rating ? rating.rating : "No rating"}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-white">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default PageInfo;
