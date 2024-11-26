import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function CreateWebsite({ onWebsiteCreate }) {
  const comtoken = localStorage.getItem("CommerceToken");

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const [creationAlert, setCreationAlert] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "textos", // Keep this name as 'textos'
  });

  const onSubmit = async (data) => {
    if (!comtoken) {
      setCreationAlert("No valid token found. Please log in.");
      return;
    }

    // Ensure 'textos' is an array of strings
    const formattedData = {
      ...data,
      textos: data.textos.map((texto) => texto.texto.trim()), // Extracting string values from the objects
    };

    try {
      const response = await fetch(`http://localhost:3000/api/paginaweb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comtoken}`,
        },
        body: JSON.stringify(formattedData),  // Send the properly formatted data
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create website.");
      }

      const newWebsiteData = await response.json();
      onWebsiteCreate(newWebsiteData); // Pass the new data back to CommerceDashboard
      setCreationAlert("Website created successfully!");
      reset(); // Optionally reset the form after submission
    } catch (error) {
      console.error("Error creating website:", error);
      setCreationAlert(error.message || "An error occurred while creating the website.");
    }
  };

  return (
    <div>
      <h2>Create New Website</h2>
      {creationAlert && <p>{creationAlert}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Ciudad:</label>
          <input {...register("ciudad", { required: "Ciudad is required" })} />
          {errors.ciudad && <p>{errors.ciudad.message}</p>}
        </div>

        <div>
          <label>Actividad:</label>
          <input {...register("actividad", { required: "Actividad is required" })} />
          {errors.actividad && <p>{errors.actividad.message}</p>}
        </div>

        <div>
          <label>Titulo:</label>
          <input {...register("titulo", { required: "Titulo is required" })} />
          {errors.titulo && <p>{errors.titulo.message}</p>}
        </div>

        <div>
          <label>Resumen:</label>
          <input {...register("resumen")} />
          {errors.resumen && <p>{errors.resumen.message}</p>}
        </div>

        <div>
          <label>Textos:</label>
          {fields.map((item, index) => (
            <div key={item.id}>
              <input
                {...register(`textos[${index}].texto`)}
                defaultValue={item.texto || ""}
              />
              {errors.textos && errors.textos[index] && errors.textos[index].texto && (
                <p>{errors.textos[index].texto.message}</p>
              )}
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ texto: "" })}>
            Add Text
          </button>
          {errors.textos && <p>{errors.textos?.message}</p>}
        </div>

        <button type="submit">Create Website</button>
      </form>
    </div>
  );
}
