import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function UpdateCommerce({ selectedComercio }) {
  const token = localStorage.getItem("token");
  const cif = selectedComercio?.cif; // Access cif safely

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // to set the default values dynamically
  } = useForm();

  const [loginAlert, setLoginAlert] = useState("");

  useEffect(() => {
    // Set default values when selectedComercio is available
    if (selectedComercio) {
      setValue("nombre", selectedComercio.nombre || "");
      setValue("direccion", selectedComercio.direccion || "");
      setValue("email", selectedComercio.email || "");
      setValue("telefono", selectedComercio.telefono || "");
    }
  }, [selectedComercio, setValue]);

  const onSubmit = async (data) => {
    const formData = {
      nombre: data.nombre,
      direccion: data.direccion,
      email: data.email,
      telefono: data.telefono,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/comercio/${cif}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update Commerce");
      }

      const responseData = await response.json();
      console.log(responseData);
      setLoginAlert("Universe Updated!");
    } catch (error) {
      console.error("Error:", error);
      setLoginAlert(error.message || "An error occurred during registration.");
    }
  };

  if (!selectedComercio) {
    return <p>Loading... Please wait while we fetch the selected commerce data.</p>;
  }

  return (
    <div>
      <h2>Update Universe</h2>
      {loginAlert && <div style={{ color: 'red' }}>{loginAlert}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input
            {...register("nombre", { required: "Nombre is required" })}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}
        </div>

        <div>
          <label>Direccion:</label>
          <input
            {...register("direccion", { required: "Direccion is required" })}
          />
          {errors.direccion && <p>{errors.direccion.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Telefono:</label>
          <input
            {...register("telefono", { required: "Telefono is required" })}
          />
          {errors.telefono && <p>{errors.telefono.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
