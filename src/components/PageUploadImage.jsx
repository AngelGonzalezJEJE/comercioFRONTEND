import React, { useState } from "react";

const UpdatePage = () => {
  const [imageFile, setImageFile] = useState(null); // Store the selected file
  const [textos, setTextos] = useState(""); // Store the text input
  const [loginAlert, setLoginAlert] = useState(""); // State to show alerts

  const handleImageChange = (event) => {
    // Set the selected image file
    setImageFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    // Set the text entered by the user
    setTextos(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      setLoginAlert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile); // Add image file to FormData
    formData.append("textos", textos); // Add text data to FormData

    try {
      const comtoken = localStorage.getItem("CommerceToken"); // Retrieve the token from localStorage

      const response = await fetch("http://localhost:3000/api/paginaWeb/img", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${comtoken}`, // Pass the token in the Authorization header
        },
        body: formData, // Attach the FormData to the request body
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Image and text updated:", responseData);
        setLoginAlert("Image and text updated successfully.");
      } else {
        const error = await response.text();
        setLoginAlert(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginAlert("An error occurred while updating.");
    }
  };

  return (
    <div>
      <h2>Update Website Image and Text</h2>

      {loginAlert && <p>{loginAlert}</p>} {/* Display alert message */}

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div>
          <label>Upload Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>

        {/* Text Input */}
        <div>
          <label>Textos:</label>
          <textarea
            name="textos"
            value={textos}
            onChange={handleTextChange}
            placeholder="Enter text to associate with the image"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdatePage;

