import { useState, useEffect } from "react";
import ReviewForm from "./ReviewWebsite";
import "../CSS/GlitchPrincess.css"; // Import the theme file

export default function PageDetails({ cif,id, closeModal }) {
  const [page, setPage] = useState(null);
  const token = localStorage.getItem("token")
  console.log(cif);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();
        console.log(data);
        setPage(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cif]);

  if (!page) return <p className="text-glitch">Loading...</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="text-white">{`Details of ${page.titulo} Website`}</h2>
          <button className="close-btn" onClick={closeModal}>X</button>
        </div>
        <div className="modal-body">
          <p className="text-white my-4">
            <strong>Resume:</strong> {page.resumen}
          </p>
        
          <p className="text-white mb-6">
            <strong>Total Ratings:</strong> {page.reseñas?.totalPuntuaciones || "N/A"}
          </p>
          <p className="text-white mb-6">
            <strong>Scoring:</strong> {page.reseñas?.scoring+'/5' || "N/A"}
          </p>
  
          <div className="card-details w-1/2 mx-auto p-4 mb-6">
            <h3 className="text-glitch text-2xl mb-4 glitch-effect" data-text="Comments">
              Comments:
            </h3>
            {page.reseñas.comentarios && page.reseñas.comentarios.length > 0 ? (
              page.reseñas.comentarios.map((comment, index) => {
                const rating = page.reseñas.ratings.find(
                  (rating) => rating.userId.toString() === comment.userId.toString()
                );
  
                return (
                  <div key={index} className="card-details p-4 mb-4">
                    <p className="text-white">
                      <strong>{comment.userName}:</strong> {comment.comentario}
                    </p>
                    <p className="text-white">
                      <strong>Rating: </strong> {rating ? rating.rating : "No rating"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-white">No comments yet.</p>
            )}
          </div>
  
          <div className="card-details p-4">
            <h3 className="text-glitch text-2xl mb-4 glitch-effect" data-text="Images">
              Images:
            </h3>
            {page.imagenes && page.imagenes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {page.imagenes.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Img ${index + 1}`}
                    className="rounded-lg shadow-lg hover:shadow-purple-500 transition duration-300"
                    style={{ maxWidth: "100%", margin: "10px 0" }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-white">No images available.</p>
            )}
          </div>
          <div className="mt-6 overflow-y-auto max-h-96" >
              {token ? (
                <ReviewForm id={id} />
              ) : (
                <div className="text-white">Login to leave a review of this reality</div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
