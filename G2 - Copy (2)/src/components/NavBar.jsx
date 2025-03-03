import './NavBar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleAddPopup = () => setShowAddPopup(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-container">
          <h1 className="navbar-title">TRASHCAN MAP</h1>
          <img src={logo} alt="logo" className="navbar-logo" />
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <div className="navbar-link" onClick={toggleAddPopup}>Add a trashcan</div>
          <Link to="/log-regist" className="navbar-link navbar-lr">Log In/Sign Up</Link>
        </div>
      </div>

      {/* Popup */}
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
