import { useState } from "react";
import "./Location_Info.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import organic from "../assets/organic.png";

const defaultFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: false },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: false },
  organicWaste: { name: "Organic Waste", icon: organic, active: false },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: false },
};

const Location_Popup = () => {
  const [showPopup2, setShowPopup2] = useState(false); // Initialize state here
  const [filters, setFilters] = useState(defaultFilters);

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
      acc[key] = { ...filters[key], active: false };
      return acc;
    }, {});
    setFilters(reset);
  };

  return (
    <div className="homepage">
      <div className="popup">
        {/* Existing content */}
        <h2>Search</h2>
        <div className="search-container">
          <img src={mag} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="search-bar"
          />
        </div>

        <div className="filter-section">
          <h3>
            <img src={filter} alt="Filter Icon" className="icon" /> Filter
            <span className="reset-filter" onClick={resetFilters}>
              Reset Filter
            </span>
          </h3>

          {Object.entries(filters).map(([key, { name, icon, active }]) => (
            <div className="filter-option" key={key}>
              <img src={icon} alt={name} className="icon" /> {name}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleFilter(key)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Popup อันที่สอง (มุมซ้ายล่าง) */}
      {showPopup2 && (
        <div className="popup popup-bottom-left">
          <h4>Hello world</h4>
          <div className="search-container">
            <img src={mag} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search Something Else..."
              className="search-bar"
            />
          </div>
        </div>
      )}

      {/* ปุ่มกด Toggle Popup ทั้งสองอัน */}
      <button
        className="circle-button"
        onClick={() => {
          setShowPopup2(!showPopup2); // Correctly toggling the popup
        }}
      >
        +
      </button>
    </div>
  );
};

export default Location_Popup;
