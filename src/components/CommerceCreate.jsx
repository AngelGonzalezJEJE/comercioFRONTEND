import { useForm } from "react-hook-form";
import { useAdmin } from '../context/AdminContext';
import {useState} from "react"
import "../CSS/GlitchPrincess.css"; 

export default function CreateCommerce() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { comToken,handleCreateComercio} = useAdmin()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(comToken).then(() => {
      alert("Token copied to clipboard!");
    }).catch(err => {
      alert("Failed to copy token: " + err.message);
    });
  };

  const onSubmit = async (data) => {
    try {
      await handleCreateComercio(data); // Pass CIF and updated data
    } catch (error) {
      alert(`Error: ${error.message,errors.message}`);
    }
  };

  return (
    <div className="text-center ">
      <h2 className="text-glitch text-3xl glitch-effect mb-6">
        Create a new Commerce
      </h2>
      {comToken && (
  <div className="token-section flex flex-col items-center mt-6">
    <h2 className="mb-4">Your token, don't lose it</h2>
    <div className="token-highlight">{comToken}</div>
    <button onClick={copyToClipboard} className="button-glitch mt-4">
      Copy
    </button>
  </div>
)}


      <form onSubmit={handleSubmit(onSubmit)} className=" mt-6 mx-auto">
        {/* Nombre */}
        <div className="mb-4 w-1/2 mx-auto">
          <label className="form-label ">Name  :</label>
          <input 
            {...register("nombre", { required: "Nombre is required" })} 
            className="input-glitch "
          />
          {errors.nombre && <p className="alert-error">{errors.nombre.message}</p>}
        </div>
  
        {/* CIF */}
        <div className="mb-4 w-1/2 mx-auto">
          <label className="form-label">CIF:</label>
          <input 
            {...register("cif", { required: "CIF is required" })} 
            className="input-glitch"
          />
          {errors.cif && <p className="alert-error">{errors.cif.message}</p>}
        </div>
  
        {/* Direccion */}
        <div className="mb-4 w-1/2 mx-auto">
          <label className="form-label">Address:</label>
          <input 
            {...register("direccion", { required: "Direccion is required" })} 
            className="input-glitch"
          />
          {errors.direccion && <p className="alert-error">{errors.direccion.message}</p>}
        </div>
  
        {/* Email */}
        <div className="mb-4 w-1/2 mx-auto">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            {...register("email", { required: "Email is required" })} 
            className="input-glitch "
          />
          {errors.email && <p className="alert-error">{errors.email.message}</p>}
        </div>
  
        {/* Telefono */}
        <div className="mb-4 w-1/2 mx-auto">
          <label className="form-label">Phone:</label>
          <input 
            {...register("telefono", { required: "Telefono is required" })} 
            className="input-glitch"
          />
          {errors.telefono && <p className="alert-error">{errors.telefono.message}</p>}
        </div>
  
        <button type="submit" className="button-glitch w-1/4">
          Submit
        </button>
      </form>
    </div>
  );
  ;
}
