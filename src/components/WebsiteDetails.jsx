import { useState, useEffect } from "react";

export default function PageDetails({ id }) {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/paginaWeb/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
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
  }, [id, token]);

  if (!page) return <p>Loading...</p>;

  return (
    <div>
      <h1>Details of {page.titulo} WebSite</h1>
      <p>Resume: {page.resumen}</p>
      <p>Texts: {page.textos}</p>
      <p>Total Ratings: {page.reseñas.totalPuntuaciones}</p>
      <div>
        <h3>Comments:</h3>
        {page.reseñas.comentarios && page.reseñas.comentarios.length > 0 ? (
          page.reseñas.comentarios.map((comment, index) => {
            // to find the corresponding rating for the comment
            const rating = page.reseñas.ratings.find(rating => rating.userId.toString() === comment.userId.toString());

            return (
              <div key={index} className="comment">
                <p><strong>{comment.userName}:</strong> {comment.comentario}</p>
                {/* display the rating next to the comment */}
                <p><strong>Rating: </strong>{rating ? rating.rating : "No rating"}</p>
              </div>
            );
          })
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <div className="imagenes">
        <h3>Images:</h3>
        {page.imagenes && page.imagenes.length > 0 ? (
          page.imagenes.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Img ${index + 1}`}
              style={{ maxWidth: "100%", margin: "10px 0" }}
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
}
