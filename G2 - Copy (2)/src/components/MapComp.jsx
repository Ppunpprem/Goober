import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "../context/LocationContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const mapCenter = { lat: 13.729109970727297, lng: 100.77557815261738 };

const MapComp = ({
  setShowHomePopup,
  setSelectedMarker,
  homeFilters = {},
  binNameFilter = "",
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [trashCanLocations, setTrashCanLocations] = useState([]);
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
            id: bin._id,
            lat: parseFloat(bin.bin_location.$lat),
            lng: parseFloat(bin.bin_location.$lng),
            name: bin.bin_name_location || "Unknown Bin",
            floor: bin.bin_floor_number,
            infoCorrection: bin.bin_info_correction,
            generalWaste: bin.bin_features_general_waste,
            recycleWaste: bin.bin_features_recycle_waste,
            organicWaste: bin.bin_features_organic_waste,
            hazardousWaste: bin.bin_features_hazardous_waste,
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
    setClearMarkers(() => handleClearLocation);
  }, [isLoaded]);

  useEffect(() => {
    console.log("Trash can locations updated:", trashCanLocations);
  }, [trashCanLocations]);

  const handleMarkerClick = (marker) => {
    console.log("Marker clicked:", marker);
    // Pass the marker data to HomePage component
    setSelectedMarker(marker);
    setShowHomePopup(true);
  };
  const handleMapClick = (event) => {
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

    setTrashCanLocations([...trashCanLocations, newMarker]);
    updateLocation(newMarker);
    setIsAddingTrashCan(false);
  };

  const handleClearLocation = () => {
    setTrashCanLocations((prev) => prev.slice(0, -1)); // Remove last marker
    // Note: clearLocation is not defined in your code, so I've removed it
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
      {/* Render trash bin markers */}
      {filterMarkers(trashCanLocations).map((loc, idx) => (
        <Marker
          key={`bin-${idx}`}
          position={{ lat: loc.lat, lng: loc.lng }}
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          onClick={() => handleMarkerClick(loc)}
        />
      ))}

      {userLocation && (
        <Marker
          position={userLocation}
          icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      )}

      {/* Removed the InfoWindow component as we're using ToiletModal from HomePage instead */}
    </GoogleMap>
  );
};

MapComp.propTypes = {
  setShowHomePopup: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
  homeFilters: PropTypes.object,
  binNameFilter: PropTypes.string,
};

export default MapComp;
