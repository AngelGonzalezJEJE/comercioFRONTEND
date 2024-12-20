import { useState } from 'react';
import { useRouter } from 'next/router'; // Import Next.js useRouter hook
import "../CSS/GlitchPrincess.css"; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAlert, setLoginAlert] = useState('');
  const router = useRouter(); // Initialize useRouter for navigation

  const fetchData = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginAlert('Email and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setLoginAlert("You've successfully logged in!");

      // Redirect to home page after successful login
      router.push('/');  // Or use '/home' depending on your routing setup

    } catch (error) {
      console.error(error);
      setLoginAlert(`Error: ${error.message}`);
    }
  };

  return (
    <div className='w-full sm:w-1/3 md:w-1/4 mx-6 my-6 min-w-[300px]'>
      <h1 className="text-glitch text-4xl mb-6 glitch-effect">
        Let's get wasted in the CyberDimension
      </h1>
      <form onSubmit={fetchData} className="auth-form mt-6">
        <div className="mb-4">
          <label className="form-label text-purple-300">Email:</label>
          <input
            type="email"
            className="input-glitch"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label text-purple-300">Password:</label>
          <input
            type="password"
            className="input-glitch"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-glitch w-1/2">
          Login
        </button>
        {loginAlert && (
          <div className={`alert mt-4 ${loginAlert.includes('Error') ? 'alert-error' : 'alert-success'}`}>
            {loginAlert}
          </div>
        )}
      </form>
    </div>
  );
}
