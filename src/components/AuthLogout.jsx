import "../CSS/GlitchPrincess.css"; 

export default function Logout({ onLogout }) {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear stored data
      localStorage.removeItem('token');
      localStorage.removeItem('CommerceToken');
      localStorage.removeItem('user');
      localStorage.removeItem('cif');
      localStorage.removeItem('Page');
      console.log('Logged out');

      // Optionally trigger callback
      if (onLogout) {
        onLogout();
      }

      // Redirect to homepage
      window.location.href = '/';
    }
  };

return (
  <button
    onClick={handleLogout}
    className="red-glitch"
  >
    Logout
  </button>
);
;
}
