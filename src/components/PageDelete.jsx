import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { useCommerceContext } from "../context/CommerceContext";

export default function DeletePage() {
  const [error, setError] = useState("");
  const { handleDelete, loading } = useCommerceContext();
  const router = useRouter(); // Initialize the Next.js router

  // Function to handle delete confirmation
  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this forever?");
    if (confirmed) {
      handleDelete(true) // Proceed with the delete action
        .then(() => {
          router.push("/commerce"); // Redirect to /commerce after successful deletion
        })
        .catch((err) => {
          setError("There was an error deleting the website.");
          console.error("Error during delete:", err);
        });
    }
  };

  return (
    <div className="text-center">
      <button
        className="delete-btn"
        onClick={handleDeleteClick} // Use the confirmation function
        disabled={loading}
      >
        Delete Forever
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
