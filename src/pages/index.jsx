import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WebsiteList from "../components/WebsiteList";
import Logout from '../components/AuthLogout';
import "../CSS/GlitchPrincess.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const comtoken = localStorage.getItem("CommerceToken");
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(localStorage.getItem("user")) : null;

    if (comtoken) {
      router.replace('/commerce');
      return;
    }

    if (user) {
      setUserRole(user.role);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>;
  }

  if (!userRole) {
    return (
      <div className="home-container">
        <div className='auth-form mt-8'>
          <h1 className='my-8 text-glitch glitch-effect rounded-lg p-4'>WELCOME TO TELOS</h1>
          <nav>
              <ul>
                <li className='my-6'>
                  <Link href="/register" className="button-glitch fixed-width">Register</Link>
                </li>
                <li className='my-6'>
                  <Link href="/login" className="button-glitch fixed-width">Login</Link>
                </li>
                <li className='my-6'>
                  <Link href="/authcommerce" className="button-glitch fixed-width">Commerce token</Link>
                </li>
              </ul>
            </nav>


        </div>
        <div className='website-list-container'>
          <WebsiteList />
        </div>
      </div>
    );
  }

  if (userRole === 'admin') {
    return (
      <div className="admin-container">
        <h1 className='my-8 text-glitch glitch-effect rounded-lg p-4'>ELDER GOD (ADMIN)</h1>
        
        <nav className='auth-form'>
          <ul>
            <li>
              <Link href="/admin" className="button-glitch fixed-width my-4">Commerce Manager</Link>
            </li>
            <li><Logout /></li>
          </ul>
        </nav>
        <div className='website-list-container'>
          <WebsiteList />
        </div>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className='auth-form mt-8'>
        <h1 className='my-8 text-glitch glitch-effect rounded-lg p-4'>NEW GOD (USER)</h1>
        
        <nav>
          <ul>
            <li>
              <Link href="/user" className="button-glitch fixed-width my-4">Update User</Link>
            </li>
            <li><Logout /></li>
          </ul>
        </nav>
      </div>
      <div className='website-list-container'>
        <WebsiteList />
      </div>
    </div>
  );
}
