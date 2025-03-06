import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useLocation } from "../context/LocationContext"
import logo from "../assets/logo.png"; // Replace with your actual logo path


const mapCenter = { lat:13.729109970727297, lng:100.77557815261738 };

const MapComp = ({ setShowHomePopup, setSelectedMarker}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [trashCanLocations, setTrashCanLocations] = useState([]);
  // const [selectedMarker, setSelectedMarker] = useState(null); // Track selected marker for popup
  const { updateLocation, setClearMarkers } = useLocation();
  


  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowHomePopup(true);
  };
  // Load saved markers from localStorage when the component mounts
  useEffect(() => {
    if (isLoaded) {
      const savedMarkers = localStorage.getItem("trashCanMarkers");
      if (savedMarkers) {
        setTrashCanLocations(JSON.parse(savedMarkers));
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.log("Geolocation permission denied:", error)
        );
      }
    }
    setClearMarkers(() => handleClearLocation);
  }, [isLoaded]);

  // Handle map click to add a new trash can marker
  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const updatedMarkers = [...trashCanLocations, newMarker];

    setTrashCanLocations(updatedMarkers);
    updateLocation(newMarker);
    // localStorage.setItem("trashCanMarkers", JSON.stringify(updatedMarkers));
  };

  const handleClearLocation = () => {
    setTrashCanLocations((prev) => prev.slice(0, -1)); // Remove last marker
    clearLocation();
  };

  if (!isLoaded) return <h2>Loading Map...</h2>;

  return (
    <GoogleMap
      center={userLocation || mapCenter}
      zoom={16}
      mapContainerStyle={{ height: "100vh", width: "100%" }}
      onClick={handleMapClick}
    >
      {/* Render trash can markers */}
      
{trashCanLocations.map((loc, idx) => (
  <Marker
    key={`trash-can-${idx}`} 
    position={loc}
    icon={{
      url: logo, // ✅ Use imported image
      scaledSize: new window.google.maps.Size(40, 40), // ✅ Adjust size
    }}
    onClick={() => handleMarkerClick(loc)}
  />
))}
      {/* Render user location marker if available */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      )}

     

    </GoogleMap>
  );
};
MapComp.propTypes = {
  setShowHomePopup: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
};
export default MapComp;
