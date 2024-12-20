export default function GoHome() {
  const handleGoHome = () => {
    window.location.href = '/';
  }

  return (
    <button
      onClick={handleGoHome}
      className="green-glitch "
    >
      Home
    </button>
  )
}