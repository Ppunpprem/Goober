import { useState } from "react";
import "./Location_Info.css";
import mag from "../assets/mag.png";
import filter from "../assets/filter-icon.png"; // Add the path for the filter icon

const Location_Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  // Initialize the filters state
  const [filters, setFilters] = useState({
    filter1: { name: "Filter 1", icon: "filter1-icon.png", active: true },
    filter2: { name: "Filter 2", icon: "filter2-icon.png", active: false },
    // Add more filters as needed
  });

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
    <div className="homepage">
      {/* Popup อันแรก (มุมขวาบน) */}
      {showPopup && (
        <div className="popup popup-top-right">
          <h2>Search</h2>
          <div className="search-container">
            <img src={mag} alt="Search Icon" className="search-icon" />
            <input type="text" placeholder="Search Location..." className="search-bar" />
          </div>
          <div className="filter-section">
            <h3>
                <img src={filter} alt="Filter Icon" className="icon" /> Filter
                <span className="reset-filter" onClick={resetFilters}>Reset Filter</span>
            </h3>
            
            {Object.entries(filters).map(([key, { name, icon, active }]) => (
                <div className="filter-option" key={key}>
                    <img src={icon} alt={name} className="icon" /> {name}
                    <label className="switch">
                        <input type="checkbox" checked={active} onChange={() => toggleFilter(key)} />
                        <span className="slider"></span>
                    </label>
                </div>        
            ))}
          </div>
        </div>
      )}

      {/* Popup อันที่สอง (มุมซ้ายล่าง) */}
      {showPopup2 && (
        <div className="popup popup-bottom-left">
          <h2>Hello world</h2>
          <div className="search-container">
            <img src={mag} alt="Search Icon" className="search-icon" />
            <input type="text" placeholder="Search Something Else..." className="search-bar" />
          </div>
        </div>
      )}

      {/* ปุ่มกด Toggle Popup ทั้งสองอัน */}
      <button
        className="circle-button"
        onClick={() => {
          setShowPopup(!showPopup);
          setShowPopup2(!showPopup2);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Location_Popup;
