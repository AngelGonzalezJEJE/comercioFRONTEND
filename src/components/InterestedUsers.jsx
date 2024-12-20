import React, { useState, useEffect } from 'react';

const InterestedEmails = () => {
  const [emails, setEmails] = useState([]); // To store the list of emails
  const [error, setError] = useState(null); // To store any error message
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const comtoken = localStorage.getItem('CommerceToken'); // Retrieve the token from localStorage

        if (!comtoken) {
          setError("You must be logged in to access this data.");
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/api/comercio/inter', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${comtoken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError("No website found. Please create a website first.");
          } else {
            const errorMessage = await response.text();
            setError(errorMessage);
          }
        } else {
          const data = await response.json();
          setEmails(data); // Set the list of emails
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        setError("An error occurred while fetching emails.");
      } finally {
        setLoading(false); // Set loading to false once the request is finished
      }
    };

    fetchEmails(); // Call the function when the component mounts
  }, []); // Empty dependency array so it runs once when the component mounts

  return (
    <div className="website-list-container text-center">
      <h2
        className="text-4xl text-glitch glitch-effect "
      >
        Interested Users Emails
      </h2>

      {loading && <p className="text-purple-300">Loading...</p>}

      {error && <p className="text-red-500 bg-black w-1/2 mx-auto mt-6">{error}</p>}

      <ul className="text-list text-glitch w-1/2 mx-auto mt-6">
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <li
              key={index}
              className="text-item card-glitch my-2 p-4 bg-opacity-50 shadow-lg"
            >
              {email}
            </li>
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-glitch">
              No interested users found or no activity available.
            </p>
          )
        )}
      </ul>
    </div>
  );}
export default InterestedEmails;
