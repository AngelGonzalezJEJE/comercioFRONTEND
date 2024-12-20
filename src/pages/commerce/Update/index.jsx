import React, { useState } from "react";
import { CommerceProvider } from "../../../context/CommerceContext";
import UpdatePage from "@/components/PageUploadImage";
import UpdateWebsite from "@/components/PageUpdate";
import DeletePage from "@/components/PageDelete";
import Logout from "@/components/AuthLogout";
import GoHome from "@/components/NavHome";

export default function Commerce() {
  // State for toggling between UpdatePage and UpdateWebsite
  const [isUpdatePage, setIsUpdatePage] = useState(true);

  // Toggle handler to switch between UpdatePage and UpdateWebsite
  const togglePage = () => setIsUpdatePage(!isUpdatePage);

  return (
    <div className="bg-UpdatePg py-8">

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

      <CommerceProvider>
        {/* Toggle Button */}
        <div className="flex space-x-4  mb-8">
          <button
            className="button-glitch text-3xl p-8 mx-auto  rounded-lg mt-6"
            onClick={togglePage}
          >
            {isUpdatePage ? "Update website" : "Upload Image"}
          </button>
        </div>
y
        {/* Conditional rendering of UpdatePage or UpdateWebsite */}
        <div className="w-full  mx-auto max-w-4xl px-4">
          {isUpdatePage ? <UpdatePage /> : <UpdateWebsite />}
        </div>
        
        {/* DeletePage */}
        <div className="mt-6">
        <DeletePage />
        </div>
      </CommerceProvider>
    </div>
  );
}
