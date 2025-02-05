import { useState, useEffect } from "react";
import "./HomePage.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import organic from "../assets/organic.png";

const defaultFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: true },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
  organicWaste: { name: "Organic Waste", icon: organic, active: true },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
};

const HomePage = () => {
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    // Disable scrolling when the homepage is mounted
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when unmounting the component
      document.body.style.overflow = "auto";
    };
  }, []);

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
      <div className="popup">
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

          {/* show all filters */}
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
    </div>
  );
};

export default HomePage;
