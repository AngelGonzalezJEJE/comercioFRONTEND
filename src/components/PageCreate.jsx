import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useCommerceContext } from "../context/CommerceContext";

export default function CreateWebsite() {
  const { addWebsite } = useCommerceContext();
  const [alert, setAlert] = useState("");
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "textos",
  });

  const onSubmit = (data) => {
    setAlert(""); // Reset alert
    const websiteData = {
      ...data,
      textos: data.textos.map((item) => item.texto.trim()),
    };

    addWebsite(websiteData)
      .then(() => {
        reset(); // Reset form on success
        window.location.reload(); // Reload the page after successful submission
      })
      .catch((error) => {
        console.error("Creation failed:", error);
        setAlert("There was an error creating the website. Please try again.");
      });
  };

  return (
    <div className="auth-form w-1/2 text-center mx-auto">
      <h2 className="text-glitch text-2xl font-bold glitch-effect mb-4">Create New Website</h2>
      {alert && <p className="text-red-500">{alert}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-1/2 mx-auto mt-6">
        <div>
          <label className="text-glitch">City:</label>
          <input
            {...register("ciudad", { required: "Ciudad is required" })}
            className="input-glitch"
          />
          {errors.ciudad && <p className="text-red-500">{errors.ciudad.message}</p>}
        </div>

        <div>
          <label className="text-glitch">Activity:</label>
          <input
            {...register("actividad", { required: "Actividad is required" })}
            className="input-glitch"
          />
          {errors.actividad && <p className="text-red-500">{errors.actividad.message}</p>}
        </div>

        <div>
          <label className="text-glitch">Title:</label>
          <input
            {...register("titulo", { required: "Titulo is required" })}
            className="input-glitch"
          />
          {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
        </div>

        <div>
          <label className="text-glitch">Summary:</label>
          <input
            {...register("resumen")}
            className="input-glitch"
          />
        </div>

        <div>
          <label className="text-glitch">Texts:</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <input
                {...register(`textos[${index}].texto`)}
                className="input-glitch"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ texto: "" })}
            className="button-glitch"
          >
            Add Text
          </button>
        </div>

        <button
          type="submit"
          className="green-glitch"
        >
          Create Website
        </button>
      </form>
    </div>
  );
}

