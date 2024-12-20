import React, { useEffect, useState } from "react";
import PageInfo from "@/components/PageDisplay";
import InterestedEmails from "@/components/InterestedUsers";
import CreateWebsite from "@/components/PageCreate";
import Logout from "@/components/AuthLogout";
import { CommerceProvider } from "../../context/CommerceContext"; // Import the context hook
import Link from "next/link";

export default function DisplayPage() {
  const [hasWebsite, setHasWebsite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Assuming the "Page" key in localStorage holds a JSON string
    const page =localStorage.getItem("Page")
    
    // If a page exists in localStorage, set hasWebsite to true
    if (page) {
      setHasWebsite(true);
    } else {
      setHasWebsite(false);
    }
  }, []);

  return (
    <CommerceProvider>
   <div className="bg-page text-glitch p-6">
  <div className="flex auth-form justify-between items-center mb-6">
    {/* Left-aligned content */}
    <div className="flex space-x-6">
      <Logout /> {/* Component that handles logout functionality */}
      
      {hasWebsite && (
        <div>
          <Link href="/commerce/Update" legacyBehavior>
            <div className="card-glitch">
              <a className="text-3xl font-bold text-glitch glitch-effect my-auto underline">
                Edit Page
              </a>
            </div>
          </Link>
        </div>
      )}
    </div>

          {/* Centered heading */}
          <h1 className="text-3xl font-bold text-glitch glitch-effect ml-auto">
            Page Dashboard
          </h1>
        </div>

        {/* Page Info - Show if website exists */}
        <div className="mt-12">
          {hasWebsite ? (
            <PageInfo />
          ) : (
            <div className="my-8 text-center">
              <h2 className="text-pink-400 text-4xl glitch-effect mb-">
                You have no website darling, Let’s change that!
              </h2>
              {/* Create Website component */}
              <div className="mt-8">
              <CreateWebsite />
              </div>
            </div>
          )}
        </div>

        {/* Show loading or error message */}
        {loading && <div className="loading-spinner text-center">Loading...</div>}
        {error && <div className="error-message text-center text-red-500">{error}</div>}

        {/* Display alert message if any */}
        {alert && <div className="alert-message text-center text-green-500">{alert}</div>}

        {/* Interested Emails Section */}
        <div className="mt-12">
          <InterestedEmails />
        </div>
      </div>
    </CommerceProvider>
  );
}
