import React, { createContext, useState, useContext } from "react";

const CommerceContext = createContext();

export const useCommerceContext = () => {
  return useContext(CommerceContext);
};

export const CommerceProvider = ({ children }) => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(null);
  const [alert, setAlert] = useState("")

  // Add a new website
  const addWebsite = async (websiteData) => {
    setLoading(true);
    setAlert("");
    try {
      const comtoken = localStorage.getItem("CommerceToken");
      if (!comtoken) {
        throw new Error("No valid token found. Please log in.");
      }
  
      const response = await fetch("http://localhost:3000/api/paginaweb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comtoken}`,
        },
        body: JSON.stringify(websiteData),
      });
  
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create website.");
      }
  
      const newWebsite = await response.json();
  
      // Add the newly created website to the websites state
      setWebsites((prev) => [...prev, newWebsite]);
  
      // Optionally store the new website's data (e.g., cif) to localStorage or update other state
      localStorage.setItem("Page", newWebsite);
      localStorage.setItem("cif", newWebsite.cif);
  
      // Log the new website's cif
      console.log( newWebsite.cif);
  
      setAlert("Website created successfully!");
    } catch (error) {
      console.error(error);
      setAlert(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing website
  const updateWebsite = async (cif, updatedData) => {
    setLoading(true);
    setAlert("");
    try {
      const comtoken = localStorage.getItem("CommerceToken");
      const cif = localStorage.getItem("cif")
      if (!comtoken) {
        throw new Error("No valid token found. Please log in.");
      }

      const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comtoken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update website.");
      }

      const updatedWebsite = await response.json();
      setWebsites((prev) =>
        prev.map((site) => (site.cif === cif ? updatedWebsite : site))
      );
      setAlert("Website updated successfully!");
    } catch (error) {
      console.error(error);
      setAlert(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Update page image and text
  const updatePageImageAndText = async (imageFile, textos) => {
    setLoading(true);
    setAlert("");
    
    try {
      // Validation: Ensure both image and text are provided
      if (!imageFile || !textos) {
        setAlert("Both image and text are required.");
        return;
      }
  
      // Retrieve token from localStorage
      const comtoken = localStorage.getItem("CommerceToken");
      if (!comtoken) {
        throw new Error("No valid token found. Please log in.");
      }
  
      // Prepare FormData
      const formData = new FormData();
      formData.append("image", imageFile);
  
      // If textos is an object, stringify it
      if (typeof textos === "object") {
        formData.append("textos", JSON.stringify(textos));
      } else {
        formData.append("textos", textos);
      }
  
      // Make the API call
      const response = await fetch("http://localhost:3000/api/paginaWeb/img", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${comtoken}`,
        },
        body: formData,
      });
  
      // Check for successful response
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update image and text.");
      }
  
      // Parse the updated data
      const updatedData = await response.json();
      setAlert("Image and text updated successfully!");
      return updatedData;
    } catch (error) {
      console.error(error);
      setAlert(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a page (hard or soft)
  const handleDelete = async (isPhysical) => {
    setLoading(true);
    setAlert("");
    try {
      const comtoken = localStorage.getItem("CommerceToken");
      if (!comtoken) {
        throw new Error("No valid token found. Please log in.");
      }

      const cif = localStorage.getItem("cif");
      if (!cif) {
        throw new Error("CIF not found. Cannot proceed with deletion.");
      }

      const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}?physical=${isPhysical}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comtoken}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to delete the page.");
      }

      setWebsites((prev) => prev.filter((site) => site.cif !== cif));
      localStorage.removeItem("Page"); 
      localStorage.removeItem("Pagecif"); 
      setAlert("Page deleted successfully.");
    } catch (error) {
      console.error(error);
      setAlert(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommerceContext.Provider
      value={{
        websites,
        addWebsite,
        updateWebsite,
        updatePageImageAndText,
        handleDelete,
        loading,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};
