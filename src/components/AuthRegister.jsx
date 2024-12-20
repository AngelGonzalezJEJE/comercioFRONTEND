import { useState } from "react";
import { useForm } from "react-hook-form";
import "../CSS/GlitchPrincess.css"; 

export default function Register() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } } = useForm();
  
  const [loginAlert, setLoginAlert] = useState("");
  
  const onSubmit = async (data) => {
    const { nombre, email, password, edad, ciudad, intereses, permiteRecibirOfertas } = data;

    const formData = {
      nombre,
      email,
      password,
      edad,
      ciudad,
      intereses: intereses.split('/').map((item) => item.trim()),
      permiteRecibirOfertas
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to register");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user))
      setLoginAlert("Welcome to the club b*tch!");
      window.location.href = '/';

    } catch (error) {
      console.log(error);
      setLoginAlert(`${error}`);
    }
  };

  return (
    <div className="auth-container bg-register">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form my-8">
        <div className="text-center mb-8">
        <h1 className="text-glitch text-3xl glitch-effect mb-6 ">
          Register Form
        </h1>
        </div>
  
        {/* Nombre */}
        <div className="mb-4">
          <label className="form-label">Name</label>
          <input 
            type="text" 
            {...register("nombre", { required: "Name is required" })} 
            className="form-input"
          />
          {errors.nombre && <p className="alert-error">{errors.nombre.message}</p>}
        </div>
  
        {/* Email */}
        <div className="mb-4">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            {...register("email", { required: "Email is required" })} 
            className="form-input"
          />
          {errors.email && <p className="alert-error">{errors.email.message}</p>}
        </div>
  
        {/* Contraseña */}
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            {...register("password", { required: "Password is required" })} 
            className="form-input"
          />
          {errors.password && <p className="alert-error">{errors.password.message}</p>}
        </div>
  
        {/* Edad */}
        <div className="mb-4">
          <label className="form-label">Age</label>
          <input 
            type="text" 
            {...register("edad", { required: "Age is required" })} 
            className="form-input"
          />
          {errors.edad && <p className="alert-error">{errors.edad.message}</p>}
        </div>
  
        {/* Ciudad */}
        <div className="mb-4">
          <label className="form-label">City</label>
          <input 
            type="text" 
            {...register("ciudad", { required: "City is required" })} 
            className="form-input"
          />
          {errors.ciudad && <p className="alert-error">{errors.ciudad.message}</p>}
        </div>
  
        {/* Intereses */}
        <div className="mb-4">
          <label className="form-label">Interests (separate with '/')</label>
          <input 
            type="text" 
            {...register("intereses", { required: "Interests are required" })} 
            className="form-input"
          />
          {errors.intereses && <p className="alert-error">{errors.intereses.message}</p>}
        </div>
  
        {/* Permitir ofertas */}
        <div className="mb-6 flex items-center">
          <label className="form-label mr-2">Allow offers based on your interests?</label>
          <input 
            type="checkbox" 
            {...register("permiteRecibirOfertas")} 
            className="form-checkbox"
          />
        </div>
  
        <button type="submit" className="button-glitch w-full">
          Register
        </button>
      </form>
  
      <div>
        <h2 className="mt-4 text-center alert-success">{loginAlert}</h2>
      </div>
    </div>
  );
  ;
}
