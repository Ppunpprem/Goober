import './NavBar2.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import bin from "../assets/bin.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import organic from "../assets/organic.png";

const NavBar2 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAddTrashcanPopup, setShowAddTrashcanPopup] = useState(false);

  const togglePopup = () => setShowPopup(prev => !prev);
  const toggleAddTrashcanPopup = () => setShowAddTrashcanPopup(prev => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="navbar-title">TRASHCAN MAP</h1>
          <img src={logo} alt="logo" className="navbar-logo" />
          <Link to="/home_after_login" className="navbar-link">Home</Link>
          <div className="navbar-link" onClick={toggleAddTrashcanPopup}>
            Add a trashcan
          </div>
        </div>

        <div className="navbar-links">
          <div className="navbar-link navbar-lr" onClick={togglePopup}>
            d2theadi
          </div>
          <img src={logo} alt="logo" className="navbar-logo navbar-logo-right" />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="menu-container">
            <Link to="/edit" className="edit-link">Edit</Link>
            <Link to="/badges" className="edit-link">Badges</Link>
            <Link to="/" className="edit-link">Log Out</Link>
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
