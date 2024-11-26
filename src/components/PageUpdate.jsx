import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateWebsite({ setIsUpdating }) {
  const comtoken = localStorage.getItem("CommerceToken");
  const page = JSON.parse(localStorage.getItem("Page")); // Retrieved website data
  const cif = localStorage.getItem("cif");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ciudad: page?.ciudad || "",
      actividad: page?.actividad || "",
      titulo: page?.titulo || "",
      resumen: page?.resumen || "",
    },
  });

  const [loginAlert, setLoginAlert] = useState("");

  // Prevent infinite loop by setting values once
  useEffect(() => {
    if (page) {
      // Set form values based on the page data
      setValue("ciudad", page.ciudad);
      setValue("actividad", page.actividad);
      setValue("titulo", page.titulo);
      setValue("resumen", page.resumen);
    }
  }, [page, setValue]);

  const onSubmit = async (data) => {
    setLoginAlert(""); // Reset alert state before API call

    const formData = {
      ciudad: data.ciudad,
      actividad: data.actividad,
      titulo: data.titulo,
      resumen: data.resumen || "", // Ensure 'resumen' is sent even if empty
      textos: data.textos?.map((item) => item.texto.trim()) || [], // Extract trimmed text values
    };

    if (!comtoken) {
      setLoginAlert("No valid token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comtoken}`,
        },
        body: JSON.stringify(formData), // Send the updated data
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update website.");
      }

      const updatedWebsiteData = await response.json();
      setLoginAlert("Website updated successfully!");
      setIsUpdating(false); // Close the update view

      // Refresh the page after a successful update
      window.location.reload();
    } catch (error) {
      console.error("Error updating website data:", error);
      setLoginAlert(error.message || "An error occurred while updating website data.");
    }
  };

  return (
    <div>
      <h2>Update Website</h2>
      {loginAlert && <p>{loginAlert}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Ciudad:</label>
          <input {...register("ciudad")} />
          {errors.ciudad && <p>{errors.ciudad.message}</p>}
        </div>

        <div>
          <label>Actividad:</label>
          <input {...register("actividad")} />
          {errors.actividad && <p>{errors.actividad.message}</p>}
        </div>

        <div>
          <label>Titulo:</label>
          <input {...register("titulo")} />
          {errors.titulo && <p>{errors.titulo.message}</p>}
        </div>

        <div>
          <label>Resumen:</label>
          <input {...register("resumen")} />
          {errors.resumen && <p>{errors.resumen.message}</p>}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={() => setIsUpdating(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
