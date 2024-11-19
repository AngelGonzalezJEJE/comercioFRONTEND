import { useState, useEffect } from "react";
import PageDetails from "./WebsiteDetails";
import ReviewForm from "./ReviewWebsite";

export default function GetAllWebsites() {
  const [webSites, setWebsites] = useState([]);
  const [error, setError] = useState(null);
  const [idSelected, setIdSelected] = useState("");

  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [scoring, setScoring] = useState(false);

  const [inputCity, setInputCity] = useState("");
  const [inputActivity, setInputActivity] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (city) params.append("ciudad", city);
    if (activity) params.append("actividad", activity);
    if (scoring) params.append("scoring", "true");

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/paginaWeb?${params.toString()}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [city, activity, scoring]);

  const applyFilters = () => {
    setCity(inputCity);
    setActivity(inputActivity);
  };
  
  


  return (
    <div>
      <h1>Search Results</h1>

      <div>
        <label>City: <input type="text" value={inputCity} onChange={(e) => setInputCity(e.target.value)} placeholder="Enter City"/>
        </label>

        <label>Activity:
          <input type="text" value={inputActivity} onChange={(e) => setInputActivity(e.target.value)} placeholder="Enter Activity"/></label>

        <label>Sort by Scoring
          <input type="checkbox" checked={scoring} onChange={() => setScoring(!scoring)}/>
        </label>

        <button onClick={applyFilters}>Apply Filters</button>
      </div>

  
      {webSites.length === 0 ? (
        <div>No results...</div>
      ) : (
        webSites.map((page, index) => (
          <div key={index} onClick={() => setIdSelected(page._id)}>
            <h2>{page.titulo}</h2>
            <p>City: {page.ciudad}</p>
            <p>Activity: {page.actividad}</p>
            <p>Scoring: {page.reseñas?.scoring}</p>
          </div>
        ))
      )}
      <div>{idSelected && <PageDetails id={idSelected} />}</div>
      <div>{idSelected && <ReviewForm id={idSelected} />}</div>
    </div>
  );
}
