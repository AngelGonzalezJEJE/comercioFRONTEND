import { useState, useEffect } from "react";
import UpdateWebsite from "./PageUpdate";
import CreateWebsite from "./PageCreate";
import "../CSS/GlitchPrincess.css"; 

export default function CommerceDashboard() {
  const comtoken = localStorage.getItem("CommerceToken");
  const cif = localStorage.getItem("cif");

  const [websiteData, setWebsiteData] = useState(null);
  const [loginAlert, setLoginAlert] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // For toggling between view and update modes    

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${comtoken}`,
          },
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to fetch website data.");
        }

        const data = await response.json();
        setWebsiteData(data);
        localStorage.setItem("Page", JSON.stringify(data)); // Save data to localStorage
      } catch (error) {
        console.error("Error fetching website data:", error);
        setLoginAlert(error.message || "An error occurred while fetching website data.");
      }
    };

    if (comtoken) {
      fetchWebsiteData();
    } else {
      setLoginAlert("No valid token found. Please log in.");
    }
  }, [comtoken]);

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  const handleWebsiteCreation = (newWebsiteData) => {
    setWebsiteData(newWebsiteData); // Update state with the newly created website data
    localStorage.setItem("Page", JSON.stringify(newWebsiteData)); // Save to localStorage
  };

  return (
    <div className="dashboard-container">
      <h2 className="text-glitch text-3xl glitch-effect mb-6" data-text="Commerce Dashboard">
        Commerce Dashboard
      </h2>
      {loginAlert && <p className="alert-success">{loginAlert}</p>}
  
      {websiteData ? (
        isUpdating ? (
          <UpdateWebsite setIsUpdating={setIsUpdating} />
        ) : (
          <div className="website-info">
            <h3 className="text-glitch text-2xl glitch-effect" data-text="Website Info">Website Info</h3>
            <div className="info-section">
              <p><strong>City:</strong> {websiteData.ciudad}</p>
              <p><strong>Activity:</strong> {websiteData.actividad}</p>
              <p><strong>Title:</strong> {websiteData.titulo}</p>
              <p><strong>Summary:</strong> {websiteData.resumen}</p>
            </div>
  
            <h4 className="text-glitch text-xl glitch-effect mt-4" data-text="Images">Images</h4>
            <div className="images-container">
              {websiteData.imagenes && websiteData.imagenes.length > 0 ? (
                websiteData.imagenes.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Website Image ${index + 1}`} 
                    className="website-image"
                  />
                ))
              ) : (
                <p className="alert-error">No images available.</p>
              )}
            </div>
  
            <h4 className="text-glitch text-xl glitch-effect mt-4" data-text="Texts">Texts</h4>
            <ul className="text-list">
              {websiteData.textos.map((texto, index) => (
                <li key={index} className="text-item">{texto}</li>
              ))}
            </ul>
  
            <button onClick={handleUpdateClick} className="button-glitch mt-4">
              Update Website
            </button>
          </div>
        )
      ) : (
        <CreateWebsite onWebsiteCreate={handleWebsiteCreation} />
      )}
    </div>
  );
  ;
}
