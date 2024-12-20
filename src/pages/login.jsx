import AuthLogin from '../components/AuthLogin'
import "../CSS/GlitchPrincess.css"

export default function login() {
  return (
    <div className='bg-login min-h-screen p-2 relative'>
      <AuthLogin/>
    </div>
  );
}
