import { useState, useEffect } from "react";

export default function PersonDetail({ url }) {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!url) return; // If no URL is provided, skip the fetch
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPerson(data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the fetchData function

  }, [url]); // Re-run the effect only if `url` changes

  // Conditional rendering based on whether person data is available
  if (!person) {
    return <h1>Select a character to see details</h1>
  }
  else{
  return (
    <div>
      <h1>Details of {person.name}</h1>

      <p>Mass: {person.mass}</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Eye color: {person.eye_color}</p>
      <p>Gender: {person.gender}</p>
    </div>
  );}
}
