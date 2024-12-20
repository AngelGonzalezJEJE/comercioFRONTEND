import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import "../CSS/GlitchPrincess.css"; 

export default function UpdateCommerce() {
  const { selectedComercio, handleUpdateComercio } = useAdmin(); // Use shared state and update handler
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loginAlert, setLoginAlert] = useState("");

  // Set default form values when `selectedComercio` changes
  useEffect(() => {
    if (selectedComercio) {
      setValue("nombre", selectedComercio.nombre || "");
      setValue("direccion", selectedComercio.direccion || "");
      setValue("email", selectedComercio.email || "");
      setValue("telefono", selectedComercio.telefono || "");
    }
  }, [selectedComercio, setValue]);

  const onSubmit = async (data) => {
    try {
      await handleUpdateComercio(selectedComercio.cif, data); // Pass CIF and updated data
      alert("Comercio updated successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
return (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold text-glitch glitch-effect mb-6">Update Commerce</h2>
    {loginAlert && <div className="text-red-500 mb-4">{loginAlert}</div>}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-1/2  mx-auto mt-8">
      <div>
        <label className="block font-semibold text-white">Name:</label>
        <input
          {...register("nombre", { required: "Nombre is required" })}
          className="input-glitch w-1/2 mx-auto"
        />
        {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
      </div>

      <div>
        <label className="block font-semibold text-white">Address:</label>
        <input
          {...register("direccion", { required: "Direccion is required" })}
          className="input-glitch w-1/2 mx-auto"
        />
        {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
      </div>

      <div>
        <label className="block font-semibold text-white">Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="input-glitch w-1/2 mx-auto"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-semibold text-white">Phone:</label>
        <input
          {...register("telefono", { required: "Telefono is required" })}
          className="input-glitch w-1/2 mx-auto"
        />
        {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
      </div>

      <button
        type="submit"
        className="button-glitch"
      >
        Submit
      </button>
    </form>
  </div>
);
;
}
