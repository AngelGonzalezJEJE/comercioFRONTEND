import { useState } from 'react';
import { AdminProvider } from '../../context/AdminContext';
import ComerciosList from '../../components/CommerceList';
import ComercioSearch from '../../components/CommerceSearch';
import ComercioDetails from '../../components/CommerceDetails';
import CreateCommerce from '@/components/CommerceCreate';
import UpdateCommerce from '../../components/CommerceUpdate';
import Logout from '../../components/AuthLogout';
import GoHome from '@/components/NavHome';

export default function AdminBoard() {
  // State to toggle between showing the main div (ComerciosList + ComercioDetails) or the Create/Update components
  const [showCreateCommerce, setShowCreateCommerce] = useState(false);
  const [showUpdateCommerce, setShowUpdateCommerce] = useState(false);

  // State to toggle the view between the main components and the create/update forms
  const [showMainComponents, setShowMainComponents] = useState(true);

  return (
    <AdminProvider>
      <div className="mx-auto p-6 bg-admin text-white min-h-screen">
        
      <div className="flex auth-form justify-between items-center mb-6">
    {/* Left-aligned content */}
    <div className="flex space-x-6">
      <GoHome />
      <Logout />
    </div>
    {/* Centered heading */}
    <h1 className="text-3xl font-bold text-glitch glitch-effect ml-auto">
      Admin Dashboard
    </h1>
  </div>

  {/* Search Section */}
  <div className="mb-4">
    <ComercioSearch />
  </div>
        
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 mt- space-x-4">
          <button
            onClick={() => {
              setShowCreateCommerce(true);
              setShowUpdateCommerce(false);
              setShowMainComponents(false); // Hide the main components when toggling to Create
            }} 
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Create Commerce
          </button>

          <button
            onClick={() => {
              setShowCreateCommerce(false);
              setShowUpdateCommerce(true);
              setShowMainComponents(false); // Hide the main components when toggling to Update
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Update Commerce
          </button>
        </div>

        {/* "Back to Main" Button */}
        {!showMainComponents && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setShowMainComponents(true); // Show the main components again
                setShowCreateCommerce(false);
                setShowUpdateCommerce(false);
              }}
              className="green-glitch"
            >
              Back
            </button>
          </div>
        )}

        {/* Conditionally Render Main Components or Create/Update Commerce */}
        <div>
          {showMainComponents ? (
            // Show Main Components (ComerciosList + ComercioDetails) by default
            <div className="flex mx-auto auth-form ">
              {/* Left Column - Comercios List */}
              <div className="my-auto flex-1">
                <ComerciosList />
              </div>

              {/* Right Column - Comercio Details */}
              <div className="flex-1 my-auto mx-auto">
                <ComercioDetails />
              </div>
            </div>
          ) : (
            // Show CreateCommerce or UpdateCommerce if toggled
            <div className="my-4 w-1/2 mx-auto auth-form">
              {showCreateCommerce && <CreateCommerce />}
              {showUpdateCommerce && <UpdateCommerce />}
            </div>
          )}
        </div>
      </div>
    </AdminProvider>
  );
}
