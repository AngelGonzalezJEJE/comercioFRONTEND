import { useState } from 'react';
import "../CSS/GlitchPrincess.css"; 

export default function AuthToken() {

  const [token, setToken] = useState('');
  const [loginAlert, setLoginAlert] = useState("");

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/commerce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });



      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Authentication failed");
      }

      const data = await response.json();
      localStorage.setItem("CommerceToken", token);
      localStorage.setItem('id', data._id);
      localStorage.setItem('cif', data.cif);
      console.log(data.cif)


      console.log("Logged in");
      console.log(data._id);
      console.log(data.cif);

      // Set a success message
      setLoginAlert({ message: `Welcome, ${data.cif}!`, type: 'success' });

      // Redirecting to the home page using React Router or browser location
      window.location.href = '/';

    } catch (error) {
      console.log(error);
      setLoginAlert({ message: `${error}`, type: 'error' });
    }
  };

  return (
    <div className="bg-authToken auth-container">
      <form onSubmit={fetchData} className="auth-form text-center">
        <div>
          <label className="form-label"> Paste Token:</label>
          <input 
            type="text" 
            value={token} 
            onChange={(e) => setToken(e.target.value)} 
            className="input-glitch" 
            required 
          />
        </div>
        <button type="submit" className="button-glitch mt-4">Token Auth</button>
      </form>
      
      {/* Display Login Alert */}
      {loginAlert && (
        <div className={`alert ${loginAlert.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          <h2>{loginAlert.message}</h2>
        </div>
      )}
    </div>
  );
}
