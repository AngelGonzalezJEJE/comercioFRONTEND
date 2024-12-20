import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function UpdateUserForm() {
  const { user, updateUser } = useUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: user?.nombre || "",
      ciudad: user?.ciudad || "",
      edad: user?.edad || "",
      intereses: user?.intereses?.join(", ") || "",
      permiteRecibirOfertas: user?.permiteRecibirOfertas || false,
    },
  });

  const [updateStatus, setUpdateStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = user?._id;
        const token = localStorage.getItem("token");

        if (!id) throw new Error("User ID not found.");

        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No user data available.");
        }

        const data = await response.json();
        reset({
          nombre: data.nombre || "",
          ciudad: data.ciudad || "",
          edad: data.edad || "",
          intereses: data.intereses?.join(", ") || "",
          permiteRecibirOfertas: data.permiteRecibirOfertas || false,
        });
      } catch (error) {
        console.error(error);
        setAlert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const successMessage = await updateUser({
        ...data,
        intereses: data.intereses.split(",").map((i) => i.trim()), // Convert string to array
      });
      setAlert({ message: successMessage, type: "success" });
      setUpdateStatus(successMessage);
      reset(data); // Update form fields with latest values
    } catch (error) {
      setAlert({ message: `Error: ${error.message}`, type: "error" });
      setUpdateStatus(error.message);
    }
  };

  if (loading) {
    return <p>Loading user data...</p>; // Replace with a spinner if needed
  }

  return (
    <div className="p-6 w-1/2 mx-auto text-white rounded-lg shadow-md">
      <h3 className="text-4xl font-bold text-glitch glitch-effect mb-12">
        Update Data
      </h3>
      
      {/* Displaying the alert message */}
      {alert && (
        <div className={`alert mb-4 p-4 rounded-lg ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 auth-form mt-6">
        <div>
          <label className="text-2xl block font-semibold mb-2">Name</label>
          <input
            {...register("nombre", { required: "Name is required" })}
            className="input-glitch w-full"
          />
          {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
        </div>
  
        <div>
          <label className="text-2xl block font-semibold mb-2">City</label>
          <input
            {...register("ciudad", { required: "City is required" })}
            className="input-glitch w-full"
          />
          {errors.ciudad && <p className="text-red-500">{errors.ciudad.message}</p>}
        </div>
  
        <div>
          <label className="text-2xl block font-semibold mb-2">Age</label>
          <input
            type="number"
            {...register("edad", {
              required: "Age is required",
              min: { value: 0, message: "Age cannot be negative" },
            })}
            className="input-glitch "
          />
          {errors.edad && <p className="text-red-500">{errors.edad.message}</p>}
        </div>
  
        <div>
          <label className="text-2xl block font-semibold mb-2">Interests (separate by commas)</label>
          <input
            {...register("intereses")}
            className="input-glitch w-full"
          />
          {errors.intereses && <p className="text-red-500">{errors.intereses.message}</p>}
        </div>
  
        <div>
          <label className="text-2xl block font-semibold mb-2">Allow Merchant Offers?</label>
          <input
            type="checkbox"
            {...register("permiteRecibirOfertas")}
            className="h-5 w-5"
          />
        </div>
  
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
}
