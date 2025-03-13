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
 // <nav className="navbar">
//       <div className="navbar-container">
//         <div className="logo-container">
//           <h1 className="navbar-title">TRASHCAN MAP</h1>
//           <img src={logo} alt="logo" className="navbar-logo" />
//           <Link to="/home_after_login" className="navbar-link">
//             Home
//           </Link>
//           <div className="navbar-link" onClick={toggleAddTrashcanPopup}>
//             Add a trashcan
//           </div>
//         </div>

//         <div className="navbar-links">
//           {/* Conditionally render the username only if user is available and not loading */}
//           <div className="navbar-link navbar-lr" onClick={togglePopup}>
//             {loading ? "Loading..." : user ? user.username : "Guest"}{" "}
            
//             {/* Render loading or username */}

//             <img 
//             src={user?.profilePhoto || logo} 
//             alt="profile" 
//             className="navbar-logo navbar-logo-right" />
//         </div>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <div className="menu-container">
//             <Link to="/edit" className="edit-link">
//               Edit
//             </Link>
//             <Link to="/badges" className="edit-link">
//               Badges
//             </Link>
//             <div className="edit-link" onClick={handleLogout}>
//               Log Out
//             </div>{" "}
//             {/* Logout button */}
//           </div>
//         </div>
//       )}

//       {showAddTrashcanPopup && (
//         <div className="popup-addtrashcan">
//           <div className="addtrashcan-container">
//             <h2>Add a Trashcan!</h2>

//             <div className="input-group">
//               <label>1. Pin a Location</label>
//             </div>

//             <div className="input-group inline-group">
//               <div className="form-field">
//                 <label>2. Location</label>
//                 <input type="text" placeholder="Location Name" />
//               </div>

//               <div className="form-field">
//                 <label>Floor</label>
//                 <input
//                   type="number"
//                   placeholder="Floor?"
//                   min="0"
//                   onChange={(f) => {
//                     if (f.target.value < 0 || f.target.value > 9) {
//                       f.target.value = 0; // Reset to 0 if the input is negative
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="trashcan-types">
//               <div className="trashcan-header">
//                 <label className="trashcan-type-label">3. Trashcan Type</label>
//                 <div className="yes-no-labels">
//                   <span>Yes</span>
//                   <span>No</span>
//                 </div>
//               </div>

//               <div className="trashcan-row">
//                 <img src={bin} alt="General Waste" />
//                 <span>General Waste</span>
//                 <div className="radio-group">
//                   <input type="radio" name="general" value="yes" />
//                   <input type="radio" name="general" value="no" />
//                 </div>
//               </div>

//               <div className="trashcan-row">
//                 <img src={recycle} alt="Recycle Waste" />
//                 <span>Recycle Waste</span>
//                 <div className="radio-group">
//                   <input type="radio" name="recycle" value="yes" />
//                   <input type="radio" name="recycle" value="no" />
//                 </div>
//               </div>

//               <div className="trashcan-row">
//                 <img src={organic} alt="Organic Waste" />
//                 <span>Organic Waste</span>
//                 <div className="radio-group">
//                   <input type="radio" name="organic" value="yes" />
//                   <input type="radio" name="organic" value="no" />
//                 </div>
//               </div>

//               <div className="trashcan-row">
//                 <img src={hazard} alt="Hazardous Waste" />
//                 <span>Hazardous Waste</span>
//                 <div className="radio-group">
//                   <input type="radio" name="hazardous" value="yes" />
//                   <input type="radio" name="hazardous" value="no" />
//                 </div>
//               </div>
//             </div>

//             <div className="button-group">
//               <button onClick={toggleAddTrashcanPopup}>Cancel</button>
//               <button onClick={toggleAddTrashcanPopup}>Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>