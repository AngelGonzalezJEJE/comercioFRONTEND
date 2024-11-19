import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ReviewForm({ id }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState("");

  const onSubmit = async (data) => {
    if (!user || !token) {
      setSubmissionStatus("login to submit a review pls");
      return;
    }

    const reviewData = { //i collect the data from the form and add the userId and name to identify the rating and comment in the database
      ...data,
      userId: user._id,
      userName: user.nombre,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/rate/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setSubmissionStatus("Review submitted successfully.");
        reset(); // Clear the form
      } else {
        const errorData = await response.json();
        setSubmissionStatus(`Error: ${errorData.message || 'Submission failed.'}`);
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("An error occurred while submitting your review.");
    }
  };

  return (
    <div>
      <h3>Review this page</h3>
      {submissionStatus && <p>{typeof submissionStatus === 'string' ? submissionStatus : JSON.stringify(submissionStatus)}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Rating (1 - 5)</label>
          <input 
            type="number" 
            {...register("rating", { 
              required: "Ratin required", 
              min: { value: 1, message: "Rating has to be  at least 1" }, 
              max: { value: 5, message: "Rating cant be above  5" } 
            })} 
          />
          {errors.rating && <p>{errors.rating.message}</p>}
        </div>
        <div>
          <label>Comment</label>
          <input 
            type="text" 
            {...register("comentario", { 
              required: "Comment is required"
            })} 
          />
          {errors.comentario && <p>{errors.comentario.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
