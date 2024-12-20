import React, { useState } from "react";
import { useCommerceContext } from "../context/CommerceContext";

const UpdatePage = () => {
  const { updatePageImageAndText } = useCommerceContext();
  const [imageFile, setImageFile] = useState(null);
  const [alert, setAlert] = useState("");
  const [textos, setTextos] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setTextos(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert(""); // Reset alert message
    setSuccessMessage(""); // Reset success message on submit

    if (!imageFile) {
      setAlert("Please select an image.");
      return;
    }

    if (!textos.trim()) { // Check if the text is empty or only spaces
      setAlert("Please enter some text.");
      return;
    }

    try {
      await updatePageImageAndText(imageFile, textos); // Use context method to upload image and text
      setSuccessMessage("Image uploaded and text saved successfully!"); // Success notification
    } catch (error) {
      console.error("Error:", error);
      setAlert("There was an error uploading the image.");
    }
  };

  return (
    <div className="auth-form w-1/2 mx-auto flex justify-center items-center text-white p-8">
      <div className="text-center">
        <h2 className="text-glitch glitch-effect text-3xl font-bold mb-4">Upload Image</h2>
        {alert && <p className="alert-error p-4 mb-4 rounded bg-red-600">{alert}</p>}
        {successMessage && <p className="alert-success p-4 mb-4 rounded bg-green-600">{successMessage}</p>} {/* Success message display */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label className="form-label text-lg ">Drop a File:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="input-glitch w-full py-2 px-4"
            />
          </div>
          <div>
            <label className="form-label text-lg">Text:</label>
            <textarea
              name="textos"
              value={textos}
              onChange={handleTextChange}
              placeholder="Enter text to associate with the image"
              className="input-glitch w-full py-2 px-4"
            />
          </div>
          <button
            type="submit"
            className="button-glitch w-1/2 py-2 px-4 text-lg font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
