import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UpdateUserForm() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
    const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: {
        nombre: user.nombre, 
        ciudad: user.ciudad, 
        edad: user.edad , 
        intereses: user.intereses, 
        permiteRecibirOfertas: user.permiteRecibirOfertas
      }
    });
  const [updateStatus, setUpdateStatus] = useState(null);

  const onSubmit = async (data) => {
    if (!user || !user._id) {
      setUpdateStatus("User data is not available.");
      return;
    }
    console.log(data)

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setUpdateStatus("User updated successfully.");
      } else {
        const errorData = await response.json();
        setUpdateStatus(`Error: ${errorData.message || 'Update failed'}`);
      }
    } catch (error) {
      console.error(error);
      setUpdateStatus("An error occurred while updating the user.");
    }
  };

  return (
    <div>
      <h3>{user.nombre}'s Update form</h3>
      {updateStatus && <p>{updateStatus}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register("nombre")} />
          {errors.nombre && <p>{errors.nombre.message}</p>}
        </div>
        <div>
          <label>City</label>
          <input {...register("ciudad")} />
          {errors.ciudad && <p>{errors.ciudad.message}</p>}
        </div>
        <div>
          <label>Age</label>
          <input type="number" {...register("edad") } />
          {errors.edad && <p>{errors.edad.message}</p>}
        </div>
        <div>
          <label>Interests(seperate each interest by commas ',' please)</label>
          <input {...register("intereses")} />
          {errors.edad && <p>{errors.intereses.message}</p>}
        </div>
        <div>
          <label>Allow merchant offers?</label>
          <input type="checkbox" {...register("permiteRecibirOfertas")} />
          {errors.edad && <p>{errors.intereses.message}</p>}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
