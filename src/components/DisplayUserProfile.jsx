import { useState, useEffect } from "react";


export default function UserProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setData(JSON.parse(user));
    }
  }, []);

  return (
    <div className="p-6 bg-glitch text-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {data ? (
        <>
          <h1 className="text-3xl font-extrabold text-glitch mb-4">{data.nombre}</h1>
          <p className="text-xl mb-2">{data.ciudad}</p>
          <p className="text-xl mb-2">{data.edad} years old</p>
          <div className="mb-4">
            <label className="font-semibold text-lg">Intereses</label>
            <ul className="space-y-2 mt-2 text-lg">
              {data.intereses.map((interes, index) => (
                <li key={index} className="hover:text-purple-500 hover:scale-105 transition duration-300 ease-in-out">
                  {interes}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-300">Loading...</p>
      )}
    </div>
  );
  
}
