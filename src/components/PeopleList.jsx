import React, { useEffect, useState } from "react";
import PersonDetail from "./PersonDetail";

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);
  const [urlSelected, setUrlSelected] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPeople(data.results);
        setError(false); // Reset error if data is fetched successfully
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true); // Set error to true if there's an error
      });
  }, []); // Ensures this effect runs only once after the initial render

  return (
    <div>
      <h2>Starwars Characters</h2>
      {error ? (
        <p>Error fetching data. Please try again later.</p>
      ) : (
        <div>
          {people.map((person, index) => (
            <div key={index}>
              <h3 onClick={() => setUrlSelected(person.url)}>{person.name}</h3>
              <p>Birth Date: {person.birth_year}</p>
              <p>Film cout: {person.films.length}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        <PersonDetail url={urlSelected} />
      </div>
    </div>
  );
}
