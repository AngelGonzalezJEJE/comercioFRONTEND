import React from 'react'
import { UserProvider } from "@/context/UserContext";
import UserProfile from '@/components/DisplayUserProfile'
import Logout from '@/components/AuthLogout'
import GoHome from '@/components/NavHome' 
import UpdateUserForm from '@/components/UpdateUser'
import DELETE_FOREVER from '@/components/DELETEFOREVER'

export default function UserDisplay() {
  return (
    <div className="min-h-screen bg-user">  {/* Ensure 'bg-login' is defined in your CSS */}
      <div className="text-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
     <div className="flex auth-form justify-between items-center mb-6">
         {/* Left-aligned content */}
         <div className="flex space-x-6">
           <GoHome />
           <Logout />
         </div>
         {/* Centered heading */}
         <h1 className="text-3xl font-bold text-glitch glitch-effect ml-auto">
           User Dashboard
         </h1>
       </div>
     
        {/* Main Content */}
        <div className="mt-6 text-center">
          {/* User-related context */}
          <UserProvider>
            <UpdateUserForm />
            <DELETE_FOREVER />
          </UserProvider>
        </div>
      </div>
    </div>
  );
}
