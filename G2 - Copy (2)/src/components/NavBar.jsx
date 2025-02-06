import './NavBar.css'; // Import the updated CSS
import logo from '../assets/logo.png'; // Replace with your actual logo path
import { Link } from 'react-router-dom'; // Import Link

import { useState } from 'react'; // Import useState

const NavBar = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);

  const toggleAddPopup = () => {
    console.log('Toggling popup visibility'); // Debugging log to ensure function triggers
    setShowAddPopup(prev => !prev);
  };

  console.log("Popup visibility state:", showAddPopup); // Debugging log to confirm state

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Navigation Links */}
        <div className="logo-container">
          <h1 className="navbar-title">TRASHCAN MAP</h1>
          <img src={logo} alt="logo" className="navbar-logo" />
          <Link to="/" className="navbar-link">Home</Link>

          {/* Button to toggle the Add Trashcan popup */}
          <div className="navbar-link" onClick={toggleAddPopup}>
            Add a trashcan
          </div>
        </div>

        {/* Login/Register Link */}
        <div className="navbar-links">
          <Link to="/log-regist" className="navbar-link navbar-lr">Log In/Sign Up</Link>
        </div>
      </div>

      {/* Popup for Add Trashcan */}
      {showAddPopup && (
        <div className="popup-add">
          <div className="add-container">
            <h2>Add a Trashcan!</h2>
            <h3>Please Log In/Sign Up first!!!</h3>
          </div>
          <div>
              <button onClick={toggleAddPopup} className="btn-button">Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
