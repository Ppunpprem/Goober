import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
};

const center = {
  lat: 13.7292802,
  lng: 100.7755859,
};

const MapComp = ({ setShowHomePopup, setSelectedMarker }) => {
  // Initialize markers state
  const [markers, setMarkers] = useState([]);

  // Load markers from localStorage on mount
  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [
      { id: 1, lat: 13.7292802, lng: 100.7755859, title: "Trash Can 1" },
      { id: 2, lat: 13.728, lng: 100.774, title: "Trash Can 2" },
    ];

    console.log("Loaded markers from localStorage:", savedMarkers); // Debugging
    setMarkers(savedMarkers);
  }, []);

  // Save markers to localStorage whenever they change
  useEffect(() => {
    if (markers.length > 0) {
      localStorage.setItem("markers", JSON.stringify(markers));
    }
  }, [markers]);

  const handleMarkerClick = (marker) => {
    console.log("Marker clicked:", marker);
    setSelectedMarker(marker);
    setShowHomePopup(true);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAn_jXXK48brxhnm4UmId0jBEbPGFe1UGM">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker
          position={{ lat: 13.72, lng: 100.7755859 }}
          onClick={() => console.log("Static Marker clicked")}
        />
        {markers.map((marker) => {
          console.log("Rendering Marker:", marker);
          return (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => handleMarkerClick(marker)}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

MapComp.propTypes = {
  setShowHomePopup: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
};

export default MapComp;

// <Marker
//   position={{ lat: 13.7292802, lng: 100.7755859 }}
//   onClick={() => console.log("Static Marker clicked")}
//       /> AIzaSyAn_jXXK48brxhnm4UmId0jBEbPGFe1UGM
