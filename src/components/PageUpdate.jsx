import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCommerceContext } from "../context/CommerceContext";

export default function UpdateWebsite() {
  const { updateWebsite } = useCommerceContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState("")
  const [page, setPage] = useState(null);  // Store fetched page data

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch page data based on CIF when the component mounts or on CIF change
  useEffect(() => {

    const comToken = localStorage.getItem("CommerceToken")
    const fetchData = async () => {
      try {
        // Get CIF from localStorage or some other source if needed
        const cif = localStorage.getItem("cif");  // Retrieve CIF from localStorage
        
        if (!cif) {
          throw new Error("CIF not found.");
        }

        // Fetch the page data from the server
        const response = await fetch(`http://localhost:3000/api/paginaweb/${cif}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${comToken}`
          }
        });

        if (!response.ok) {
          throw new Error("No website Avilable, please create  website first");
        }

        const data = await response.json();
        setPage(data);  // Store the fetched page data in state

      } catch (error) {
        console.error(error);
        setAlert("No website Avilable, please create  website first");
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Populate form fields when page data is fetched
  useEffect(() => {
    if (page) {
      setValue("ciudad", page.ciudad);
      setValue("actividad", page.actividad);
      setValue("titulo", page.titulo);
      setValue("resumen", page.resumen);
    }
  }, [page, setValue]);  // Runs when page data is fetched

  // Handle form submission
  const onSubmit = async (data) => {
    setAlert(""); // Reset alert message
    setIsSubmitting(true); // Disable form during submission
    try {
      const updatedData = {
        ciudad: data.ciudad,
        actividad: data.actividad,
        titulo: data.titulo,
        resumen: data.resumen || "",
      };

      // Get `cif` from localStorage (ensure it's available)
      const cif = page?.cif || localStorage.getItem("cif");
      if (!cif) {
        throw new Error("No website Avilable, please create  website first");
      }

      await updateWebsite(cif, updatedData); // Call context method to update the website
      setAlert("Website updated successfully!");

      // Optionally store updated page data in localStorage
      localStorage.setItem("Page", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Update failed:", error);
      setAlert(error.message || "Failed to update the website.");
    } finally {
      setIsSubmitting(false); // Re-enable form
    }
  };

  return (
    <div className="auth-form w-1/2 mx-auto text-center">
      <h2 className="text-glitch glitch-effect text-2xl font-bold mb-4">Update Website</h2>
      {alert && <p className="text-green-500">{alert}</p>}
      {page ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-1/2 mx-auto">
          {/* Ciudad Field */}
          <div>
            <label htmlFor="ciudad" className="text-glitch">
              City:
            </label>
            <input
              id="ciudad"
              {...register("ciudad", { required: "Ciudad is required." })}
              className="input-glitch "
            />
            {errors.ciudad && (
              <p className="text-red-500">{errors.ciudad.message}</p>
            )}
          </div>
  
          {/* Actividad Field */}
          <div>
            <label htmlFor="actividad" className="text-glitch">
              Activity:
            </label>
            <input
              id="actividad"
              {...register("actividad", { required: "Actividad is required." })}
              className="input-glitch "
            />
            {errors.actividad && (
              <p className="text-red-500">{errors.actividad.message}</p>
            )}
          </div>
  
          {/* Titulo Field */}
          <div>
            <label htmlFor="titulo" className="text-glitch">
              Title:
            </label>
            <input
              id="titulo"
              {...register("titulo", { required: "Titulo is required." })}
              className="input-glitch "
            />
            {errors.titulo && (
              <p className="text-red-500">{errors.titulo.message}</p>
            )}
          </div>
  
          {/* Resumen Field */}
          <div>
            <label htmlFor="resumen" className="text-glitch">
              Summary:
            </label>
            <input
              id="resumen"
              {...register("resumen")}
              className="input-glitch"
            />
            {errors.resumen && (
              <p className="text-red-500">{errors.resumen.message}</p>
            )}
          </div>
  
          {/* Action Buttons */}
          <div className="mt-4">
          <button
            type="submit"
            className="button-glitch w-1/2 text-lg font-bold"
          >
            Submit
          </button>
          </div>
        </form>
      ) : (
        <p className="text-white">Loading page data...</p>
      )}
    </div>
  );
  ;
}
