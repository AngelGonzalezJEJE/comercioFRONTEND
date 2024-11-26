import { useState, useEffect } from "react";
import UpdateWebsite from "./PageUpdate";
import CreateWebsite from "./PageCreate";

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
    <div>
      <h2>Commerce Dashboard</h2>
      {loginAlert && <p>{loginAlert}</p>}

      {websiteData ? (
        isUpdating ? (
          <UpdateWebsite setIsUpdating={setIsUpdating} />
        ) : (
          <div>
            <h3>Website Info</h3>
            <p><strong>City:</strong> {websiteData.ciudad}</p>
            <p><strong>Activity:</strong> {websiteData.actividad}</p>
            <p><strong>Title:</strong> {websiteData.titulo}</p>
            <p><strong>Summary:</strong> {websiteData.resumen}</p>
            <h4>Images:</h4>
            <div>
              {websiteData.imagenes && websiteData.imagenes.length > 0 ? (
                websiteData.imagenes.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Wimg ${index + 1}`} 
                    style={{ width: '100%', maxWidth: '500px', marginBottom: '10px' }} 
                  />
                ))
              ) : (
                <p>No images available.</p>
              )}
            </div>

            <h4>Textos:</h4>
            <ul>
              {websiteData.textos.map((texto, index) => (
                <li key={index}>{texto}</li>
              ))}
            </ul>
            <button onClick={handleUpdateClick}>Update Website</button>
          </div>
        )
      ) : (
        // Show the CreateWebsite component if no website data is found
        <CreateWebsite onWebsiteCreate={handleWebsiteCreation} />
      )}
    </div>
  );
}
