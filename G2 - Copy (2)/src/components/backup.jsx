import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Style for the map container
const containerStyle = {
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
};

const MapComp = ({ setShowHomePopup, setSelectedMarker }) => {
  // Initialize markers state
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [geoError, setGeoError] = useState(false); // Track geolocation errors

  // Use the hook for loading the script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Load markers from localStorage on mount
  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    setMarkers(savedMarkers);
  }, []); // Empty dependency array to run once on component mount

  // Save markers to localStorage when they are updated
  useEffect(() => {
    if (markers.length > 0) {
      localStorage.setItem("markers", JSON.stringify(markers));
    }
  }, [markers]); // Re-run when markers state is updated

  // Handle click on a marker
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowHomePopup(true);
  };

  // Handle map click to add a marker
  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const newMarker = { id: Date.now(), lat, lng, title: "New Marker" };
    const newMarkers = [...markers, newMarker];
    setMarkers(newMarkers);
  };

  // Get the user's current location and store it in localStorage
  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (storedLocation) {
      setUserLocation(storedLocation);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = { lat: latitude, lng: longitude };
            setUserLocation(location);
            localStorage.setItem("userLocation", JSON.stringify(location)); // Save location to localStorage
          },
          (error) => {
            console.error("Error getting user location:", error);
            setGeoError(true);
            setUserLocation({ lat: 13.7292802, lng: 100.7755859 }); // Fallback to a default location
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setGeoError(true);
        setUserLocation({ lat: 13.7292802, lng: 100.7755859 }); // Fallback location
      }
    }
  }, []); // Runs once on mount

  // Delete saved markers from localStorage
 
  // If the Google Maps API is not loaded, show loading state
  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  if (loadError) {
    return <div>Error loading map</div>;
  }

  // Custom icon for the user's location marker (person icon)
  const userLocationIcon = {
    url: "https://img.icons8.com/ios/452/user-location.png", // Person icon URL
    scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
  };

  return (
    <div>
      {geoError && (
        <div style={{ padding: "10px", background: "#ffcccb" }}>
          <strong>Geolocation Error: Using fallback location</strong>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 13.7292802, lng: 100.7755859 }} // Fallback if location isn't available
        zoom={15}
        onClick={handleMapClick} // Handle map click to add marker
      >
        {/* Static Marker for testing */}
        <Marker position={{ lat: 13.72, lng: 100.7755859 }} onClick={() => console.log("Static Marker clicked")} />

        {/* Rendering dynamic markers */}
        {markers.length > 0 ? (
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => handleMarkerClick(marker)} // Handling marker click
            />
          ))
        ) : (
          <div>No markers available</div>
        )}

        {/* Marker for the user's location with custom icon */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={userLocationIcon} // Custom icon
            title="Your Location"
          />
        )}
      </GoogleMap>
    </div>
  );
};

MapComp.propTypes = {
  setShowHomePopup: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
};

export default MapComp;
