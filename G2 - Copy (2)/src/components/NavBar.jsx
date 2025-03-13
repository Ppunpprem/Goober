import './NavBar.css'; // Import the updated CSS
import logo from '../assets/logo.png'; // Replace with your actual logo path
import { Link } from 'react-router-dom'; // Import Link

import { useState, useEffect } from 'react'; // Import useState and useEffect

const NavBar = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAddPopup = () => {
    setShowAddPopup(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
          <Link to="/" className="title-link">
            <h1 className="navbar-title">TRASHCAN MAP</h1>
          </Link>
          {windowWidth > 768 && (
            <div className="nav-links">
              <Link to="/" className="navbar-link">Home</Link>
              <div className="navbar-link" onClick={toggleAddPopup}>Add a trashcan</div>
            </div>
          )}
        </div>

        <div className="nav-right">
          {windowWidth > 768 ? (
            <Link to="/log-regist" className="navbar-link navbar-lr">Log In/Sign Up</Link>
          ) : (
            <button 
              className="mobile-menu-button" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {windowWidth <= 768 && isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <div className="mobile-link" onClick={toggleAddPopup}>Add a trashcan</div>
            <Link to="/log-regist" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Log In/Sign Up</Link>
          </div>
        )}
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
