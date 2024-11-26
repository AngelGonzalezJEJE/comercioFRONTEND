import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CreateCommerce() {
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginAlert, setLoginAlert] = useState("");
  const [comtoken, setComToken] = useState('')

  const onSubmit = async (data) => {
    // Format the form data for submission
    const formData = {
      nombre: data.nombre,
      cif: data.cif,
      direccion: data.direccion,
      email: data.email,
      telefono: data.telefono,
    };

    try {
      const response = await fetch("http://localhost:3000/api/comercio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to register Commerce");
      }

      const responseData = await response.json();
      localStorage.setItem("CommerceToken", responseData.token);
      setLoginAlert("New Universe created!");
      setComToken(responseData.token)

    } catch (error) {
      console.error("Error:", error);
      setLoginAlert(error.message || "An error occurred during registration.");
    }
  };

  return (
    <div>
      <h2>Create a new Commerce</h2>
      {loginAlert && <p>{loginAlert}</p>}
      <p>Your token: {comtoken}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input {...register("nombre", { required: "Nombre is required" })} />
          {errors.nombre && <p>{errors.nombre.message}</p>}
        </div>

        <div>
          <label>CIF:</label>
          <input {...register("cif", { required: "CIF is required" })} />
          {errors.cif && <p>{errors.cif.message}</p>}
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
