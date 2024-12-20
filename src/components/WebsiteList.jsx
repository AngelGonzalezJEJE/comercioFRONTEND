import { useState, useEffect } from "react";
import PageDetails from "./WebsiteDetails";

import "../CSS/GlitchPrincess.css"; // Import the Glitch Princess theme styles

export default function GetAllWebsites() {
  const [webSites, setWebsites] = useState([]);
  const [error, setError] = useState(null);
  const [idSelected, setIdSelected] = useState("");
  const [cifSelected, setCifSelected] = useState("");
  const [showDetails, setShowDetails] = useState(false); // Toggle state for PageDetails modal

  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [scoring, setScoring] = useState(false);

  const [inputCity, setInputCity] = useState("");
  const [inputActivity, setInputActivity] = useState("");
  const [token, setToken] = useState(null);

  const handleSelection = (cif, id) => {
    setCifSelected(cif);
    setIdSelected(id); // Set the selected CIF when an item is clicked
    setShowDetails(true); // Show the PageDetails component (open modal)
  };

  const closeDetails = () => {
    setShowDetails(false); // Close the PageDetails component (close modal)
    setCifSelected("");
    setIdSelected("");
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (city) params.append("ciudad", city);
    if (activity) params.append("actividad", activity);
    if (scoring) params.append("scoring", "true");

    const fetchData = async () => {
      try {
        setToken(localStorage.getItem("token"));
        const response = await fetch(
          `http://localhost:3000/api/paginaweb?${params.toString()}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWebsites(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, [city, activity, scoring, token]);

  const applyFilters = () => {
    setCity(inputCity);
    setActivity(inputActivity);
  };

  return (
    <div >
      <div className="flex items-center justify-center">
    <h1 className="text-glitch text-4xl mb-6 glitch-effect mt-8">
      Cosmic Websites
    </h1>
  </div>

      <div className="card-glitch mb-6 p-4 w-1/2 mx-auto">
        <div className="my-4">
          <label className="text-white mr-2">

            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Enter City"
              className="input-glitch"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-white mr-2">
            <input
              type="text"
              value={inputActivity}
              onChange={(e) => setInputActivity(e.target.value)}
              placeholder="Enter Activity"
              className="input-glitch"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-white mr-2">
            Sort by Scoring
            <input
              type="checkbox"
              checked={scoring}
              onChange={() => setScoring(!scoring)}
              className="ml-2"
            />
          </label>
        </div>

        <button onClick={applyFilters} className="button-glitch">
          Apply Filters
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {webSites.length === 0 ? (
        <div className="text-white">No results...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {webSites.map((page, index) => (
            <div
              key={index}
              onClick={() => handleSelection(page.cif, page._id)}
              className="card-glitch cursor-pointer hover:bg-gray-700 transition"
            >
              <h2 className="text-glitch text-2xl">{page.titulo}</h2>
              <p className="text-white">City: {page.ciudad}</p>
              <p className="text-white">Activity: {page.actividad}</p>
              <p className="text-white">
                Scoring: {page.reseñas?.scoring || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for PageDetails */}
      {showDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeDetails} className="close-btn">
              X
            </button>
            {/* PageDetails Component */}
            <PageDetails cif={cifSelected} id={idSelected} closeModal={closeDetails}/>

            {/* Review Form inside the modal, below the PageDetails */}
          
          </div>
        </div>
      )}
    </div>
  );
}
