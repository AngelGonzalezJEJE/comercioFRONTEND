import { useState } from "react";
import { useForm } from "react-hook-form";

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

    } catch (error) {
      console.log(error);
      setLoginAlert(`${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register Form</h1>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            {...register("nombre", { required: "Name is required" })} 
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email" 
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Age</label>
          <input 
            type="text" 
            {...register("edad", { required: "Age is required" })} 
          />
          {errors.edad && <p>{errors.edad.message}</p>}
        </div>

        <div>
          <label>City</label>
          <input 
            type="text" 
            {...register("ciudad", { required: "City is required" })} 
          />
          {errors.ciudad && <p>{errors.ciudad.message}</p>}
        </div>

        <div>
          <label>Interests (separate with '/')</label>
          <input 
            type="text" 
            {...register("intereses", { required: "Interests are required" })} 
          />
          {errors.intereses && <p>{errors.intereses.message}</p>}
        </div>

        <div>
          <label>Allow offers based on your interests?</label>
          <input 
            type="checkbox" 
            {...register("permiteRecibirOfertas")} 
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div>
        <h2>{loginAlert}</h2>
      </div>
    </div>
  );
}
