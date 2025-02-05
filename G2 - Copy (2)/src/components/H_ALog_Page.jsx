import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./H_ALog_Page.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import organic from "../assets/organic.png";
import { Link } from "react-router-dom";

const defaultFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: true },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
  organicWaste: { name: "Organic Waste", icon: organic, active: true },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
};

const H_ALog_Page = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [popupVisible, setPopupVisible] = useState(false);  // Initially set popupVisible to false
  const [bottomPopupVisible, setBottomPopupVisible] = useState(false);  // To show bottom-left popup
  
  // Use the location from React Router to access the state passed from LogInPage
  const location = useLocation();

  useEffect(() => {
    // If 'showPopup' state is passed and is true, set popupVisible to true
    if (location.state && location.state.showPopup) {
      setPopupVisible(true);
    }
  }, [location.state]);

  const toggleFilter = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        active: !prev[filterKey].active,
      },
    }));
  };

  const resetFilters = () => {
    const reset = Object.keys(filters).reduce((acc, key) => {
      acc[key] = { ...filters[key], active: true };
      return acc;
    }, {});
    setFilters(reset);
  };

  return (
    <div className="alog-page">
      {/* Search popup (will appear if showPopup is true) */}
      {popupVisible && (
        <div className="alog-popup">
          <h2>Search</h2>
          <div className="alog-search-container">
            <img src={mag} alt="Search Icon" className="alog-search-icon" />
            <input type="text" placeholder="Search Location..." className="alog-search-bar" />
          </div>

          <div className="alog-filter-section">
            <h3>
              <img src={filter} alt="Filter Icon" className="alog-icon" /> Filter
              <span className="alog-reset-filter" onClick={resetFilters}>Reset Filter</span>
            </h3>

            {Object.entries(filters).map(([key, { name, icon, active }]) => (
              <div className="alog-filter-option" key={key}>
                <img src={icon} alt={name} className="alog-icon" /> {name}
                <label className="alog-switch">
                  <input type="checkbox" checked={active} onChange={() => toggleFilter(key)} />
                  <span className="alog-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom-left popup - shows after clicking the circle button */}
      {bottomPopupVisible && (
        <div className="alog-popup-bottom-left">
          <h2>Bottom Popup</h2>
        </div>
      )}

      <Link to="/location_info" className="alog-circle-button">
        <button
          className="alog-add-button"
          onClick={() => setBottomPopupVisible(true)}  // Show bottom-left popup on button click
        >
          +
        </button>
      </Link>
    </div>
  );
};

export default H_ALog_Page;
