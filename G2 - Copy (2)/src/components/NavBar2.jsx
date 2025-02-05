import './NavBar2.css'; 
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar2 = () => {
  // สร้าง state สำหรับควบคุมการแสดง popup
  const [showPopup, setShowPopup] = useState(false);

  // ฟังก์ชันเพื่อเปิด/ปิด popup
  const togglePopup = () => {
    setShowPopup(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Navigation Links */}
        <div className="logo-container">
          <h1 className="navbar-title">TRASHCAN MAP</h1>
          <img src={logo} alt="logo" className="navbar-logo" />
          <Link to="/home_after_login" className="navbar-link">Home</Link>
          <a href="/add-trashcan" className="navbar-link">Add a trashcan</a>
        </div>

        {/* Login/Register Link */}
        <div className="navbar-links">
          <div
            className="navbar-link navbar-lr" 
            onClick={togglePopup} // เมื่อคลิกที่ d2theadi ให้เปิด/ปิด popup
          >
            d2theadi
          </div>
          <img src={logo} alt="logo" className="navbar-logo navbar-logo-right" />
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="menu-container">
            <Link to="/edit" className="edit-link">Edit</Link>
            <Link to="/badges" className="edit-link">Badges</Link>
            <Link to="/" className="edit-link">Log Out</Link>
    

          </div>
        </div>
      )}


    </nav>
  );
};

export default NavBar2;
