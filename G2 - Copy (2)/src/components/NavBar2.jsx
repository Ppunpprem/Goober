import "./NavBar2.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import bin from "../assets/bin.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import organic from "../assets/organic.png";

const NavBar2 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAddTrashcanPopup, setShowAddTrashcanPopup] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initial user state is null
  const [loading, setLoading] = useState(true); // Loading state to indicate data fetching

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:5001/api/auth/profile", {
            method: "GET",
            headers: { "x-auth-token": token },
          });

          const data = await res.json();
          console.log("User data:", data); // Log the user data here
          if (res.ok) {
            setUser(data);
            setLoading(false); // Set loading to false once data is fetched
          } else {
            alert("Failed to load profile");
            setLoading(false); // Set loading to false on error too
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          alert("Failed to load profile");
          setLoading(false); // Set loading to false on error
        }
      } else {
        setLoading(false); // If no token, set loading to false
      }
    };

    fetchUserData();
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to login page
  };

  const togglePopup = () => setShowPopup((prev) => !prev);
  const toggleAddTrashcanPopup = () => setShowAddTrashcanPopup((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="navbar-title">TRASHCAN MAP</h1>
          <img src={logo} alt="logo" className="navbar-logo" />
          <Link to="/home_after_login" className="navbar-link">
            Home
          </Link>
          <div className="navbar-link" onClick={toggleAddTrashcanPopup}>
            Add a trashcan
          </div>
        </div>

        <div className="navbar-links">
          {/* Conditionally render the username only if user is available and not loading */}
          <div className="navbar-link navbar-lr" onClick={togglePopup}>
            {loading ? "Loading..." : user ? user.username : "Guest"}{" "}
            {/* Render loading or username */}
          </div>

          <img
            src={logo}
            alt="logo"
            className="navbar-logo navbar-logo-right"
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="menu-container">
            <Link to="/edit" className="edit-link">
              Edit
            </Link>
            <Link to="/badges" className="edit-link">
              Badges
            </Link>
            <div className="edit-link" onClick={handleLogout}>
              Log Out
            </div>{" "}
            {/* Logout button */}
          </div>
        </div>
      )}

      {showAddTrashcanPopup && (
        <div className="popup-addtrashcan">
          <div className="addtrashcan-container">
            <h2>Add a Trashcan!</h2>

            <div className="input-group">
              <label>1. Pin a Location</label>
            </div>

            <div className="input-group inline-group">
              <div className="form-field">
                <label>2. Location</label>
                <input type="text" placeholder="Location Name" />
              </div>

              <div className="form-field">
                <label>Floor</label>
                <input
                  type="number"
                  placeholder="Floor?"
                  min="0"
                  onChange={(f) => {
                    if (f.target.value < 0 || f.target.value > 9) {
                      f.target.value = 0; // Reset to 0 if the input is negative
                    }
                  }}
                />
              </div>
            </div>

            <div className="trashcan-types">
              <div className="trashcan-header">
                <label className="trashcan-type-label">3. Trashcan Type</label>
                <div className="yes-no-labels">
                  <span>Yes</span>
                  <span>No</span>
                </div>
              </div>

              <div className="trashcan-row">
                <img src={bin} alt="General Waste" />
                <span>General Waste</span>
                <div className="radio-group">
                  <input type="radio" name="general" value="yes" />
                  <input type="radio" name="general" value="no" />
                </div>
              </div>

              <div className="trashcan-row">
                <img src={recycle} alt="Recycle Waste" />
                <span>Recycle Waste</span>
                <div className="radio-group">
                  <input type="radio" name="recycle" value="yes" />
                  <input type="radio" name="recycle" value="no" />
                </div>
              </div>

              <div className="trashcan-row">
                <img src={organic} alt="Organic Waste" />
                <span>Organic Waste</span>
                <div className="radio-group">
                  <input type="radio" name="organic" value="yes" />
                  <input type="radio" name="organic" value="no" />
                </div>
              </div>

              <div className="trashcan-row">
                <img src={hazard} alt="Hazardous Waste" />
                <span>Hazardous Waste</span>
                <div className="radio-group">
                  <input type="radio" name="hazardous" value="yes" />
                  <input type="radio" name="hazardous" value="no" />
                </div>
              </div>
            </div>

            <div className="button-group">
              <button onClick={toggleAddTrashcanPopup}>Cancel</button>
              <button onClick={toggleAddTrashcanPopup}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar2;
