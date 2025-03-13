import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const mapCenter = { lat:13.729109970727297, lng:100.77557815261738 };

const MapComp = ({ setShowHomePopup, setSelectedMarker }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [trashCanLocations, setTrashCanLocations] = useState([]);

  const [selectedMarker, setSelectedMarkerState] = useState(null);
  const {
    updateLocation,
    setClearMarkers,
    isAddingTrashCan,
    setIsAddingTrashCan,
  } = useLocation();


  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleMarkerClick = (marker) => {
    console.log('Marker clicked:', marker); // เพิ่ม log
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
  }, [isLoaded]);

  // Handle map click to add a new trash can marker
  const handleMapClick = (event) => {
// <<<<<<< wins-final
//     const newMarker = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };
//     const updatedMarkers = [...trashCanLocations, newMarker];

//     setTrashCanLocations(updatedMarkers);
//     localStorage.setItem("trashCanMarkers", JSON.stringify(updatedMarkers));
// =======
    console.log("click", isAddingTrashCan);
    if (!isAddingTrashCan) return;
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      name: "New Bin", // Provide a default name
      floor: "Unknown",
      infoCorrection: false,
      generalWaste: false,
      recycleWaste: false,
      organicWaste: false,
      hazardousWaste: false,
    };
    const updatedMarkers = [...trashCanLocations, newMarker];

  
    setTrashCanLocations([newMarker]);
    updateLocation(newMarker);
    setIsAddingTrashCan(false);
    // localStorage.setItem("trashCanMarkers", JSON.stringify(updatedMarkers));
  };

  const handleClearLocation = () => {
    setTrashCanLocations((prev) => prev.slice(0, -1)); // Remove last marker
    clearLocation();
  };

  const filterMarkers = (markers) => {
    return markers.filter((marker) => {
      const matchesName = marker.name
        ? marker.name.toLowerCase().includes(binNameFilter.toLowerCase())
        : false;
      const matchesFilters = Object.entries(homeFilters).every(
        ([key, filter]) => {
          if (!filter.active) return true;
          return marker[key];
        }
      );
      return matchesName && matchesFilters;
    });

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
          key={`trash-can-${idx}`} // Use index for marker keys
          position={loc}
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          onClick={() => handleMarkerClick(loc)} // Trigger popup on marker click
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
