import React, { useState } from 'react';
import "../CSS/GlitchPrincess.css"; 

const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const handleDeleteUserForever = async () => {
    setIsLoading(true);
    try {
      // Simulate your delete account API call
      // await deleteAccountApi();
      localStorage.removeItem('token');
      localStorage.removeItem('CommerceToken');
      localStorage.removeItem('user');
      localStorage.removeItem('cif');
      setAlert('Your account has been deleted permanently.');
      window.location.href = '/';
    } catch (error) {
      setAlert('An error occurred while deleting your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="bg-black">Delete Account</h3>
      <p className="bg-black">Do you really want to delete your account permanently?</p>
      {alert && <p>{alert}</p>}
      <button
        onClick={handleDeleteUserForever}
        disabled={isLoading}
        className={`delete-btn ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? "Deleting..." : "Delete Forever"}
      </button>
    </div>
  );
};

export default DeleteAccount;
