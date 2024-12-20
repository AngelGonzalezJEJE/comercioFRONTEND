import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Hook for easy access
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user and token from localStorage on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const deleteUser = async () => {
    if (!user || !user._id || !token) {
      throw new Error("User or token information is missing.");
    }

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${user._id}?physical=true`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user.");
      }

      // Clear user data upon successful deletion
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);

      return "User successfully deleted.";
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/usuarios/${user._id}`, {
        method: "PUT", // Use PUT for updates
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Update context with new user data
      return "User updated successfully!";
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(error.message || "Error updating user");
    }
  };


  return (
    <UserContext.Provider value={{ user, token, deleteUser, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
