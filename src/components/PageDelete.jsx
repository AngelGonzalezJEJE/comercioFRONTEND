import { useState } from "react";

export default function DeletePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (isPhysical) => {
    setLoading(true);
    setError(""); // Reset previous error

    const comtoken = localStorage.getItem("CommerceToken");
    const cif = localStorage.getItem("cif");

    try {
      // API endpoint for deleting the page (hard or soft delete)
      const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}?physical=${isPhysical}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comtoken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the page");
      }

      // After successful deletion, update the page data or perform any necessary actions
      alert("Page deleted successfully");
    } catch (error) {
      console.error("Error deleting page:", error);
      setError(error.message || "An error occurred while deleting the page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this page?</h2>
      <button onClick={() => handleDelete(false)} disabled={loading}>
        Soft Delete
      </button>
      <button onClick={() => handleDelete(true)} disabled={loading}>
        Hard Delete
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
