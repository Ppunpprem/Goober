import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      // If token is not available, exit early
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5001/api/auth/profile", {
          headers: { "x-auth-token": token },
        });

        // Include the user ID in the safeUserData
        const safeUserData = {
          id: response.data.id,  // Add user ID here
          username: response.data.username,
          profilePhoto: response.data.profilePhoto,
        };

        setUser(safeUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); 

  const updateUser = (newUserData) => {
    const safeUserData = {
      id: newUserData.id,  
      username: newUserData.username,
      profilePhoto: newUserData.profilePhoto,
    };
    setUser(safeUserData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
