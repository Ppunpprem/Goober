import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const mapCenter = { lat: 13.729109970727297, lng: 100.77557815261738 };

const MapComp = ({ setShowHomePopup, setSelectedMarker, setUser }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [trashCanLocations, setTrashCanLocations] = useState([]);
  const [selectedMarker, setSelectedMarkerState] = useState(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Fetch bin locations from database
  useEffect(() => {
    if (isLoaded) {
      fetch("http://localhost:5001/api/bin")
        .then(async (res) => {
          const contentType = res.headers.get("content-type");

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          if (contentType && contentType.includes("application/json")) {
            return res.json(); // Parse JSON normally
          } else {
            const htmlText = await res.text(); // Read as HTML text
            throw new Error(`Expected JSON but received HTML: ${htmlText}`);
          }
        })
        .then((data) => {
          console.log("Fetched bin data:", data); // Log fetched data
          const markers = data.map((bin) => ({
            lat: parseFloat(bin.bin_location.$lat),
            lng: parseFloat(bin.bin_location.$lng),
            name: bin.bin_name_location,
            floor: bin.bin_floor_number,
            infoCorrection: bin.bin_info_correction,
          }));
          console.log("Processed markers:", markers); // Log processed markers
          setTrashCanLocations(markers);
        })
        .catch((error) => {
          console.error("Error fetching bins:", error);
        });

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log("Geolocation permission denied:", error);
            setUserLocation(mapCenter); // Fallback location
          }
        );
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("Trash can locations updated:", trashCanLocations);
  }, [trashCanLocations]);

  // Function to handle new user data safely
  const handleNewUserData = (newUserData) => {
    const safeUserData = {
      username: newUserData.username,
      profilePhoto: newUserData.profilePhoto,
    };
    setUser(safeUserData);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarkerState(marker);
    setShowHomePopup(true);
  };

  if (!isLoaded) return <h2>Loading Map...</h2>;

  return (
    <GoogleMap
      center={userLocation || mapCenter}
      zoom={16}
      mapContainerStyle={{ height: "100vh", width: "100%" }}
    >
      {/* Render trash bin markers */}
      {trashCanLocations.map((loc, idx) => (
        <Marker
          key={`bin-${idx}`}
          position={{ lat: loc.lat, lng: loc.lng }}
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
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

      {/* Render InfoWindow if a marker is selected */}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarkerState(null)}
        >
          <div>
            <h3>{selectedMarker.name}</h3>
            <p>Floor: {selectedMarker.floor}</p>
            <p>Info Correction: {selectedMarker.infoCorrection}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

MapComp.propTypes = {
  setShowHomePopup: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired, // Ensure setUser is passed in
};

export default MapComp;
