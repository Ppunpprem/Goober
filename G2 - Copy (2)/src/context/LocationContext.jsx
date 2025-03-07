import React, { createContext, useContext, useState } from 'react';

// Create the Location context
const LocationContext = createContext();

// Create a provider to manage location state
export const LocationProvider = ({ children }) => {
  const [lastLocation, setLastLocation] = useState(null);
  const [clearMarkers, setClearMarkers] = useState(() => () => {}); 
  const [isAddingTrashCan, setIsAddingTrashCan] = useState(false);

  // Function to update the last clicked location
  const updateLocation = (location) => {
    setLastLocation(location);
  };

  const clearLocation = () => {
    setLastLocation(null);
    clearMarkers();
  };

  return (
    <LocationContext.Provider value={{ lastLocation,
    setLastLocation, updateLocation, clearLocation, setClearMarkers, isAddingTrashCan, setIsAddingTrashCan, }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use location context
export const useLocation = () => useContext(LocationContext);
