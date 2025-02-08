import { useState, useEffect } from "react";
import "./H_ALog_Page.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import check from "../assets/check-mark-button.png";
import cross from "../assets/cross-mark.png";
import organic from "../assets/organic.png";
import { First_test_building, First_comment } from "../Damo_data/bindata";

var Check_type;
if ({First_test_building.general_waste}) {
  loginButton = <img src={check} width={24} height={24}></img>;
} else {
  loginButton = <img src={cross} width={24} height={24}></img>;
}

const defaultFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: true },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
  organicWaste: { name: "Organic Waste", icon: organic, active: true },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
};

const H_ALog_Page = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
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
    <div className="alog-page">
      {/* Always Visible Search & Filter Popup */}
      <div className="alog-popup">
        <h2>Search</h2>
        <div className="alog-search-container">
          <img src={mag} alt="Search Icon" className="alog-search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="alog-search-bar"
          />
          <button className="alog-search-button">Search</button>
        </div>

        <div className="alog-filter-section">
          <h3>
            <img src={filter} alt="Filter Icon" className="alog-icon" /> Filter
            <span className="alog-reset-filter" onClick={resetFilters}>
              Reset Filter
            </span>
          </h3>
          {Object.entries(filters).map(([key, { name, icon, active }]) => (
            <div className="alog-filter-option" key={key}>
              <img src={icon} alt={name} className="alog-icon" /> {name}
              <label className="alog-switch">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleFilter(key)}
                />
                <span className="alog-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Button to Show Hello Popup */}
      <button className="alog-circle-button" onClick={() => setShowPopup(true)}>
        <div className="alog-add-button">+</div>
      </button>

      {/* Hello Popup */}
      {showPopup && (
        <div className={`info-popup ${showPopup ? "show" : ""}`}>
          <div className="flex-container">
            <div className="flex-container-inner">
              <h3>{First_test_building.building_name}</h3>
              <h2>{First_test_building.floor_number}th Floor</h2>
              <h4>Is this information correct?</h4>
            </div>
            <div className="flex-container-inner">
              <h4>Features</h4>
              <ul className="trash-type-container">
                <li>
                  <div className="trash-type">
                    <img src={bin} width={24} height={24}></img>
                    <div>General Waste </div>
                    {Check_type}
                    
                  </div>
                </li>
                <li>
                  <div className="trash-type">
                    <img src={recycle} width={24} height={24}></img>
                    <div>Recycle Waste</div>
                  </div>
                </li>
                <li>
                  <div className="trash-type">
                    <img src={organic} width={24} height={24}></img>
                    <div>Organic Waste</div>
                  </div>
                </li>
                <li>
                  <div className="trash-type">
                    <img src={hazard} width={24} height={24}></img>
                    <div>Hazardous Waste</div>
                  </div>
                </li>
              </ul>
            </div>
            <div>3</div>
            <div>4</div>

            {/* <div className="flex-container-inner">
              <div>1.1</div>
              <div>1.2</div>
            </div>
            <div className="flex-container-inner">
              <div>2.1</div>
              <div>2.2</div>
            </div>
            <div>3</div>
            <div>4</div> */}
            {/* <div className="flex-container">
              <h3>{First_test_building.building_name}</h3>
              <h2>{First_test_building.floor_number}th Floor</h2>
              <h3>Is this infomation correct?</h3>
            </div>
            <div className="flex-container">
              <h3>Comments</h3>
              <h1>{First_comment}</h1>
            </div>
            <div>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default H_ALog_Page;
