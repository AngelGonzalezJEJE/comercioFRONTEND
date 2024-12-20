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
    <div className="p-6 bg-glitch text-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-glitch mb-4">Review this Page</h3>
      {submissionStatus && (
        <p className="mb-4 text-glitch">
          {typeof submissionStatus === 'string'
            ? submissionStatus
            : JSON.stringify(submissionStatus)}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rating Input */}
        <div className="w-1/5 mx-auto text-center">
          <label className="block font-semibold mb-2">Rating (1 - 5)</label>
          <input
            type="number"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Rating has to be at least 1" },
              max: { value: 5, message: "Rating can't be above 5" },
            })}

            className="input-glitch text-center w-1/2"
          />
          {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
        </div>
  
        {/* Comment Input */}
        <div className="w-1/2 mx-auto">
          <label className="block font-semibold mb-2">Comment</label>
          <input
            type="text"
            {...register("comentario", {
              required: "Comment is required",
            })}
            className="input-glitch w-full"
          />
          {errors.comentario && (
            <p className="text-red-500">{errors.comentario.message}</p>
          )}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="button-glitch w-1/2 mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
  ;
}
