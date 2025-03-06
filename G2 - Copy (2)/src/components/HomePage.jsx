import { useState, useEffect } from "react";
import "./HomePage.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import check from "../assets/check-mark-button.png";
import cross from "../assets/cross-mark.png";
import organic from "../assets/organic.png";
import MapComp from "../components/MapComp.jsx";

import { First_test_building, commnents } from "../Damo_data/bindata";

const defaultHomeFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: false },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: false },
  organicWaste: { name: "Organic Waste", icon: organic, active: false },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: false },
};

const HomePage = () => {
  const [homeFilters, setHomeFilters] = useState(defaultHomeFilters);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [binNameFilter, setBinNameFilter] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleHomeFilter = (filterKey) => {
    setHomeFilters((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        active: !prev[filterKey].active,
      },
    }));
  };

  const resetHomeFilters = () => {
    const reset = Object.keys(homeFilters).reduce((acc, key) => {
      acc[key] = { ...homeFilters[key], active: false };
      return acc;
    }, {});
    setHomeFilters(reset);
  };

  return (
    <div className="home-page">
      <div className="map-container">
        <MapComp
          setShowHomePopup={setShowHomePopup}
          setSelectedMarker={setSelectedMarker}
          homeFilters={homeFilters}
          binNameFilter={binNameFilter}
        />
      </div>
      <div className="home-popup">
        <h2>Search</h2>
        <div className="home-search-container">
          <img src={mag} alt="Search Icon" className="home-search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="home-search-bar"
            value={binNameFilter}
            onChange={(e) => setBinNameFilter(e.target.value)}
          />
          <button className="home-search-button">Search</button>
        </div>

        <div className="home-filter-section">
          <h3>
            <img src={filter} alt="Filter Icon" className="home-icon" /> Filter
            <span className="home-reset-filter" onClick={resetHomeFilters}>
              Reset Filter
            </span>
          </h3>
          {Object.entries(homeFilters).map(([key, { name, icon, active }]) => (
            <div className="home-filter-option" key={key}>
              <img src={icon} alt={name} className="home-icon" /> {name}
              <label className="home-switch">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleHomeFilter(key)}
                />
                <span className="home-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
