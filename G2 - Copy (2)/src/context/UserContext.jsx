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

        const safeUserData = {
          username: response.data.username,
          profilePhoto: response.data.profilePhoto,
        };

        setUser(safeUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., redirect to login if token is invalid)
      }
    };

    fetchUserData();
  }, []); // Empty array ensures it runs only once when component mounts

  const updateUser = (newUserData) => {
    const safeUserData = {
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
